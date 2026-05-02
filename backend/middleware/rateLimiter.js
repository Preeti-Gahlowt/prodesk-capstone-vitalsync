const rateLimit = require("express-rate-limit");

// 🔐 LOGIN LIMIT (strict)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // only 10 attempts
  message: {
    message: "Too many login attempts. Try again later.",
  },
});

// 🤖 AI LIMIT (moderate)
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20,
  message: {
    message: "Too many AI requests. Please slow down.",
  },
});

module.exports = { loginLimiter, aiLimiter };