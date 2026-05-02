const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  userId: {                // ✅ ADD THIS (IMPORTANT)
    type: String,
   required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "upcoming",
  },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);