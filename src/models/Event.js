const mongoose = require("mongoose");

const statusList = [
  "initiated",
  "scs_review",
  "fm_review",
  "am_decision",
  "meeting",
  "tasks_started",
  "in_progress",
  "closed"
];

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  startDate: Date,
  endDate: Date,
  preferences: [String],
  status: {
    type: String,
    enum: statusList,
    default: "initiated"
  },
  history: [
    {
      action: String,
      by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now }
    }
  ]
});

// Transition validation will be implemented in TDD phase ✅
module.exports = mongoose.model("Event", EventSchema);
