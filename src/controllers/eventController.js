// controllers/eventController.js
const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const {
      // from client form
      recordNumber,
      clientName,
      eventType,
      description,
      expectedNumber,
      budget,
      from,          // start date
      to,            // end date
      decorations,
      food,
      photos,
      music,
      artwork,
      computer,
      other
    } = req.body;

    const startDate = from ? new Date(from) : undefined;
    const endDate   = to ? new Date(to) : undefined;

    if (startDate && endDate && startDate > endDate) {
      return res.status(400).json({ message: "startDate must be before endDate" });
    }

    const expectedNumberNum = expectedNumber !== "" ? Number(expectedNumber) : undefined;
    const budgetSEKNum = budget !== "" ? Number(budget) : undefined;

    // Build preferences from free-text sections (kept for compatibility)
    // const preferences = []
    //   .concat(decorations ? [`Decorations: ${decorations}`] : [])
    //   .concat(food ? [`Food/Drinks: ${food}`] : [])
    //   .concat(photos ? [`Filming/Photos: ${photos}`] : [])
    //   .concat(music ? [`Music: ${music}`] : [])
    //   .concat(artwork ? [`Posters/Art Work: ${artwork}`] : [])
    //   .concat(computer ? [`Computer: ${computer}`] : [])
    //   .concat(other ? [`Other: ${other}`] : []);

    // const finalTitle =
    //   title && title.trim()
    //     ? title.trim()
    //     : `${eventType || "Event"}${clientName ? ` - ${clientName}` : ""}${recordNumber ? ` (#${recordNumber})` : ""}`;

    // if (!finalTitle) {
    //   return res.status(400).json({ message: "Title is required" });
    // }

    const event = await Event.create({
      // title: finalTitle,
      recordNumber,
      clientName,
      eventType,
      description,
      expectedNumber: Number.isFinite(expectedNumberNum) ? expectedNumberNum : undefined,
      budgetSEK: Number.isFinite(budgetSEKNum) ? budgetSEKNum : undefined,
      startDate,
      endDate,
      decorations,
      food,
      photos,
      music,
      artwork,
      computer,
      other
    });

    return res.status(201).json(event);
  } catch (err) {
    console.error("Event creation error:", err);
    return res.status(500).json({ message: "Event creation failed" });
  }
};

// Simple list endpoint for sidebar "Requests" view
exports.listEvents = async (_req, res) => {
  try {
    const items = await Event.find().sort({ createdAt: -1 }).limit(100);
    return res.json(items);
  } catch (err) {
    console.error("List events error:", err);
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};
