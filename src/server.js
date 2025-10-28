const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/auth", authRoutes);

connectDB();
// Simple test route
app.get("/", (req, res) => res.send("SEP System API Running ✅"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
