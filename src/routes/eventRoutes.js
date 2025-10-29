const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController");
const auth = require("../middleware/authMiddleware");
const { get } = require("mongoose");

router.get("/", getEvents);
router.post("/", auth, createEvent);

module.exports = router;
