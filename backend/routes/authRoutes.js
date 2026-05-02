const express = require("express");
const router = express.Router();
const {registerUser, loginUser,} = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");




router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);

module.exports = router;