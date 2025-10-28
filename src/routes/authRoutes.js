const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.get("/test", (req, res) => {
  console.log("✅ Auth Test Hit");
  res.send("Auth Route Working!");
});

router.post("/login", login);

module.exports = router;
