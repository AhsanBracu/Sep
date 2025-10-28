const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/auth", authRoutes);

app.use("/events", eventRoutes);

connectDB();
// Simple test route
app.get("/", (req, res) => res.send("SEP System API Running ✅"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
