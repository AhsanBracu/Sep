const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const auth = require("../middleware/authMiddleware");
const managerControl = require("../middleware/managerControl");

// Only managers (SM, HR, PM, FM) can create or manage teams
router.post("/", auth, managerControl, teamController.createTeam);
router.post("/:teamId/tasks", auth, managerControl, teamController.addTaskToTeam);
router.get("/my-managed", auth, managerControl, teamController.getMyManagedTeams);

// Any authenticated user can view or comment on their team
router.get("/my-teams", auth, teamController.getMyTeams);
router.get("/:teamId/tasks", auth, teamController.getTeamTasks);
router.post("/:teamId/tasks/:taskId/comments", auth, teamController.addCommentToTask);

module.exports = router;
