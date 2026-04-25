const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;


   // Check Authorization header
  if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user(without password)
      req.user = await User.findById(decoded.id).select("-password");

      //allow request to proceed
      next();
    } 
    catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = { protect };