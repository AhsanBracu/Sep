const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
require("dotenv").config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use("/auth", authRoutes);
// allow your frontend dev origin

 

app.use("/events", eventRoutes);

connectDB();
// Simple test route
app.get("/", (req, res) => res.send("SEP System API Running ✅"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


