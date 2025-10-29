const mongoose = require("mongoose");

const statusList = [
  "initiated",
  "scs_review",
  "fm_review",
  "am_decision",
  "meeting",
  "tasks_started",
  "in_progress",
  "closed",
];

const EventSchema = new mongoose.Schema(
  {
    // Core
    // title: { type: String, required: true, trim: true },
    // client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },

    // Optional client-facing identifiers
    recordNumber: { type: String, trim: true, index: true },
    clientName: { type: String, trim: true } ,// if you don’t always have a Client _id yet

    // Event meta
    eventType: { type: String, trim: true, default: "Workshop" },
    description: { type: String, trim: true },
    expectedNumber: { type: Number, min: 0 },
    budgetSEK: { type: Number, min: 0 },

    // Dates
    startDate: Date,
    endDate: Date,

    // Request sections (normalized but human-readable)
    decorations: { type: String, trim: true },
    food: { type: String, trim: true },          // Food/Drinks
    photos: { type: String, trim: true },        // Filming/Photos
    music: { type: String, trim: true },
    artwork: { type: String, trim: true },       // Posters/Art Work
    computer: { type: String, trim: true },      // Computer-Related Issues
    other: { type: String, trim: true },

    // Legacy / extra tags
    // preferences: [String],

    // Workflow
   status: { type: String, enum: statusList, default: "initiated", index: true },

    // Audit
    history: [
      {
        action: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Optional: ensure start <= end
EventSchema.pre("save", function (next) {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    return next(new Error("startDate must be before endDate"));
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);
