const axios = require("axios");

(async function testEventSubmission() {
  try {
    // 1️⃣  Login to get JWT token
    const loginRes = await axios.post("http://localhost:8000/auth/login", {
      email: "ahsan@example.com",
      password: "123456"
    });
    const token = loginRes.data.token;
    console.log("✅ Logged in, got token");

    // 2️⃣  Try to create an event
    const eventRes = await axios.post(
      "http://localhost:8000/events",
      {
        title: "Product Launch 2025",
        preferences: ["food", "decoration"],
        startDate: "2025-12-01",
        endDate: "2025-12-03"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!eventRes.data || !eventRes.data.title)
      throw new Error("Event not returned");

    console.log("✅ Event submitted successfully:", eventRes.data.title);
  } catch (err) {
    console.error(
      "❌ Event submission test failed:",
      err.response?.data || err.message
    );
    process.exit(1);
  }
})();
