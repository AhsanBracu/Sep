const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [
      "CSO", "SCS", "FM", "AM",
      "PM", "SM", "HR", "VP"
    ],
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
