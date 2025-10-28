const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, createEvent);

module.exports = router;
