const axios = require("axios");

// (async function testEventSubmission() {
//   try {
//     // 1️⃣  Login to get JWT token
//     const loginRes = await axios.post("http://localhost:8000/auth/login", {
//       email: "ahsan@example.com",
//       password: "123456"
//     });
//     const token = loginRes.data.token;
//     console.log("✅ Logged in, got token");

//     // 2️⃣  Try to create an event
//     const eventRes = await axios.post(
//       "http://localhost:8000/events",
//       {
//         title: "Product Launch 2025",
//         preferences: ["food", "decoration"],
//         startDate: "2025-12-01",
//         endDate: "2025-12-03"
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` }
//       }
//     );

//     if (!eventRes.data || !eventRes.data.title)
//       throw new Error("Event not returned");

//     console.log("✅ Event submitted successfully:", eventRes.data.title);
//   } catch (err) {
//     console.error(
//       "❌ Event submission test failed:",
//       err.response?.data || err.message
//     );
//     process.exit(1);
//   }
// })();


(async function testEventSubmission() {
  try {
    // 1️⃣ Login to get JWT token
    const loginRes = await axios.post("http://localhost:8000/auth/login", {
      email: "ahsan@example.com",
      password: "123456",
    });

    const token = loginRes.data.token;
    console.log("✅ Logged in, got token");

    // 2️⃣ Try to create an event (adjusted for new Event schema)
    const eventPayload = {
      recordNumber: "EVT-2025-001",
      clientName: "Nordic Innovations AB",
      eventType: "Product Launch",
      description: "Launch event for the new eco-friendly product line.",
      expectedNumber: 120,
      budgetSEK: 150000,
      startDate: "2025-12-07T09:00:00Z",
      endDate: "2025-12-09T18:00:00Z",
      decorations: "Corporate theme with eco-design elements",
      food: "Buffet lunch and coffee breaks",
      photos: "Professional photographer for the entire event",
      music: "Live DJ performance",
      artwork: "Branded posters and banners",
      computer: "Projector setup for presentations",
      other: "VIP seating arrangement",
    };

    const eventRes = await axios.post("http://localhost:8000/events", eventPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const createdEvent = eventRes.data;

    if (!createdEvent || !createdEvent._id)
      throw new Error("Event was not created properly");

    console.log("✅ Event created successfully:");
    console.log(`   Record #: ${createdEvent.recordNumber}`);
    console.log(`   Client:   ${createdEvent.clientName}`);
    console.log(`   Status:   ${createdEvent.status}`);

  } catch (err) {
    console.error(
      "❌ Event submission test failed:",
      err.response?.data || err.message
    );
    process.exit(1);
  }
})();
