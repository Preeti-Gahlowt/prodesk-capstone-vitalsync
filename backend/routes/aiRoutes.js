const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { aiLimiter } = require("../middleware/rateLimiter");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/suggest
router.post("/suggest", aiLimiter, async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ Validate input
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    // Load Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    // Call AI
   const result = await model.generateContent(`
You are a medical assistant.

Based on the symptoms, ONLY suggest the type of doctor the patient should consult.

Respond with ONLY one word or short phrase like:
"General Physician", "Dermatologist", "Cardiologist", "Neurologist"

Symptoms: ${prompt}
`);

const response = await result.response;
const text = response.text().trim();

    // Send response
    res.json({
  specialist: text,
});

  } catch (err) {
    console.error("Gemini Error:", err);

    res.status(500).json({
      message: "AI request failed",
    });
  }
});

module.exports = router;