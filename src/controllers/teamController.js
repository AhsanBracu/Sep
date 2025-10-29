const Team = require("../models/Team");

// 1. Create Team (manager only)
exports.createTeam = async (req, res) => {
  try {
    const managerId = req.user.id; // Extracted from JWT
    const { name, members, tasks } = req.body;

    if (!name) return res.status(400).json({ message: "Team name is required" });

    const team = await Team.create({
      name,
      manager: managerId,
      members: members || [],
      tasks: tasks || [],
    });

    res.status(201).json(team);
  } catch (err) {
    console.error("Team creation error:", err.message);
    res.status(500).json({ message: "Team creation failed" });
  }
};

// 2. Get all teams created by logged-in manager
exports.getMyManagedTeams = async (req, res) => {
  try {
    const managerId = req.user.id;
    const teams = await Team.find({ manager: managerId }).populate("members", "name email");
    res.status(200).json(teams);
  } catch (err) {
    console.error("Error fetching manager teams:", err.message);
    res.status(500).json({ message: "Failed to get teams" });
  }
};

// 3. Get all teams where logged-in user is a member
exports.getMyTeams = async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await Team.find({ members: userId }).populate("manager", "name email");
    res.status(200).json(teams);
  } catch (err) {
    console.error("Error fetching member teams:", err.message);
    res.status(500).json({ message: "Failed to get teams" });
  }
};

// 4. Get all tasks for a team (accessible to manager or members)
exports.getTeamTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { teamId } = req.params;

    const team = await Team.findById(teamId).populate("tasks.comments.user", "name email");
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.manager.toString() !== userId && !team.members.includes(userId)) {
      return res.status(403).json({ message: "You are not authorized to view this team's tasks" });
    }

    res.status(200).json(team.tasks);
  } catch (err) {
    console.error("Error fetching team tasks:", err.message);
    res.status(500).json({ message: "Failed to get tasks" });
  }
};

// 5. Add a new task to a team (manager only)
exports.addTaskToTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const { teamId } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Task name is required" });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.manager.toString() !== userId) {
      return res.status(403).json({ message: "Only the manager can add tasks" });
    }

    team.tasks.push({ name });
    await team.save();

    res.status(201).json({ message: "Task added successfully", tasks: team.tasks });
  } catch (err) {
    console.error("Error adding task:", err.message);
    res.status(500).json({ message: "Failed to add task" });
  }
};

// 6. Add a comment to a task (manager or member)
exports.addCommentToTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { teamId, taskId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const task = team.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (team.manager.toString() !== userId && !team.members.includes(userId)) {
      return res.status(403).json({ message: "You are not authorized to comment" });
    }

    task.comments.push({ user: userId, text });
    await team.save();

    res.status(201).json({ message: "Comment added successfully", comments: task.comments });
  } catch (err) {
    console.error("Error adding comment:", err.message);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
