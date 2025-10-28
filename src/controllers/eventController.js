const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { title, preferences, startDate, endDate } = req.body;
    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const event = await Event.create({
      title,
      preferences,
      startDate,
      endDate,
      status: "initiated",
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("Event creation error:", err.message);
    res.status(500).json({ message: "Event creation failed" });
  }
};
