const mongoose = require("mongoose");
const { assertEqual } = require("./assert");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

async function setupTestUser() {
  await User.deleteMany(); // Clean DB
  const hashed = await bcrypt.hash("123456", 10);
  return await User.create({
    name: "Ahsan",
    email: "ahsan@example.com",
    role: "CSO",
    password: hashed
  });
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  return jwt.sign({ id: user._id, role: user.role }, "testSecret");
}

    // (async function testLoginSuccess() {
    //   await mongoose.connect("mongodb://127.0.0.1:27017/sep");
    //   const user = await setupTestUser();

    //   const token = await login("ahsan@example.com", "123456");

    //   assertEqual(typeof token, "string", "JWT is returned on successful login");

    //   console.log("✅ Login test passed using real MongoDB");
    //   mongoose.disconnect();
    // })();

(async function testLoginAPI() {
  try {
    const res = await axios.post("http://localhost:8000/auth/login", {
      email: "ahsan@example.com",
      password: "123456"
    });

    if (!res.data.token) {
      throw new Error("Token not returned");
    }

    console.log("✅ API Login test passed, token received ✅",res.data.token);

  } catch (err) {
    console.error("❌ API Login test failed:", err.response?.data || err.message);
    process.exit(1);
  }
})();
