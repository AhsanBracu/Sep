const axios = require("axios");

(async function testTeamFlow() {
  try {
    const loginRes = await axios.post("http://localhost:8000/auth/login", {
      email: "manager@example.com",
      password: "123456"
    });

    const token = loginRes.data.token;
    console.log("✅ Logged in, got token");

    const createTeamRes = await axios.post(
      "http://localhost:8000/teams",
      {
        name: "Alpha Project Team",
        members: [], // optional, can add member IDs
        tasks: [] // optional initial tasks
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const team = createTeamRes.data;
    console.log("Team created:", team.name, "ID:", team._id);

    const myTeamsRes = await axios.get(
      "http://localhost:8000/teams/my-managed",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(" My managed teams:", myTeamsRes.data.map(t => t.name));

    const addTaskRes = await axios.post(
      `http://localhost:8000/teams/${team._id}/tasks`,
      { name: "Design Mockups" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const task = addTaskRes.data.tasks[addTaskRes.data.tasks.length - 1];
    console.log(" Task added:", task.name, "ID:", task._id);

    const addCommentRes = await axios.post(
      `http://localhost:8000/teams/${team._id}/tasks/${task._id}/comments`,
      { text: "Initial designs ready for review" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(
      "Comment added:",
      addCommentRes.data.comments[addCommentRes.data.comments.length - 1].text
    );

  } catch (err) {
    console.error(
      "test failed:",
      err.response?.data || err.message
    );
    process.exit(1);
  }
})();
