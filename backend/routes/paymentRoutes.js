const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Import your Appointment model
const Appointment = require("../models/Appointment");


// ==============================
// 1. CREATE CHECKOUT SESSION
// ==============================
router.post("/create-checkout-session", async (req, res) => {
    
  try {
    const { doctorId, date, time, userId } = req.body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      // What user is paying for
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Doctor Appointment",
            },
            unit_amount: 50000, // ₹500 (Stripe uses paise)
          },
          quantity: 1,
        },
      ],

      // After success → redirect here
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,

      // If user cancels
      cancel_url: `http://localhost:3000/cancel`,

      // Store data temporarily in Stripe
     metadata: {
  doctorId: req.body.doctorId,
  date: req.body.date,
  time: req.body.time,
  userId: req.body.userId,  // 🔥 MUST BE HERE
}
    });

    // Send checkout URL to frontend
    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe session failed" });
  }
});


// ==============================
// 2. VERIFY PAYMENT & SAVE DATA
// ==============================
router.get("/verify/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId
    );

    // ❗ ONLY proceed if payment is successful
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // console.log removed

    // 🔍 Check duplicate FIRST
    const existing = await Appointment.findOne({
      doctorId: session.metadata.doctorId,
      date: session.metadata.date,
      time: session.metadata.time,
      userId: session.metadata.userId,
    });

    if (existing) {
      // console.log removed
      return res.json({ success: true });
    }

    // ✅ SAVE ONLY ONCE (AND ONLY HERE)
    const newAppointment = new Appointment({
      doctorId: session.metadata.doctorId,
      date: session.metadata.date,
      time: session.metadata.time,
      userId: session.metadata.userId,
    });

    await newAppointment.save();

    // console.log removed

    res.json({ success: true });

  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;