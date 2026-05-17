const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

// msg for testing server 
app.get("/", (req, res) => {
  res.send("VitalSync Backend is Running");
});


const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const aiRoutes = require("./routes/aiRoutes");




/* Middleware */
app.use(cors());
app.use(express.json());


/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// Use payment routes
app.use("/api/payment", paymentRoutes);
// appoinment route for fetching, canceling, rescheduling appointments
app.use("/api/appointments", appointmentRoutes);

// helmet for security headers
app.use(helmet());


/* DB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => {})// console.log removed)

/* Server */
app.listen(5000, () => {
  // console.log removed
});