const { assertEqual } = require("./assert");
const User = require("../src/models/User");
const Event = require("../src/models/Event");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fake DB-like storage for TDD simulation (no server yet)
const fakeDB = {
  users: [],
  events: []
};

// ✅ Helper functions to simulate behavior
async function registerUser(name, email, password, role) {
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role });
  fakeDB.users.push(user);
  return user;
}

async function login(email, password) {
  const user = fakeDB.users.find(u => u.email === email);
  if (!user) throw new Error("User not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "testSecretJWT",
    { expiresIn: "1h" }
  );
  return token;
}

async function saveEvent(userToken, eventData) {
  const decoded = jwt.verify(userToken, "testSecretJWT");
  if (!decoded) throw new Error("Not authenticated");

  const event = new Event({
    ...eventData,
    status: "initiated"
  });

  fakeDB.events.push(event);
  return event;
}

// ✅ Test1: User Registration + Login
(async function testUserLogin() {
  const user = await registerUser(
    "John Doe", 
    "john@example.com", 
    "123456", 
    "CSO"
  );

  const token = await login("john@example.com", "123456");
  
  console.log("✅ User successfully logged in and JWT created");
})();

// ✅ Test2: Authenticated user can save event
(async function testSaveEvent() {
  const user = await registerUser(
    "Sam", 
    "sam@example.com", 
    "654321", 
    "CSO"
  );
  
  const token = await login("sam@example.com", "654321");

  const event = await saveEvent(token, {
    title: "Business Conference",
    preferences: ["food", "decoration"]
  });

  assertEqual(event.title, "Business Conference", "Event title stored");
  assertEqual(event.status, "initiated", "Event default status is initiated");

  console.log("✅ Authenticated user saved event successfully");
})();
