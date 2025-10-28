// middleware/managerControl.js

module.exports = (req, res, next) => {
    try {
      const { role } = req.user; // from JWT
  
      const allowedRoles = ["SM", "HR", "PM", "FM"];
  
      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Access denied: insufficient privileges" });
      }
  
      next();
    } catch (err) {
      console.error("Manager control error:", err.message);
      res.status(500).json({ message: "Authorization error" });
    }
  };
  