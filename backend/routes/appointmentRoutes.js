const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

// ==========================
// GET USER APPOINTMENTS
// ==========================


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // console.log removed // debug

    const appointments = await Appointment.find({
     userId: userId,   // STRING MATCH
    });

    // console.log removed

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});


// ==========================
// CANCEL APPOINTMENT
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// ==========================
// RESCHEDULE APPOINTMENT
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const { date, time } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;