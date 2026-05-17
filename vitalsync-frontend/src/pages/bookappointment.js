import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bookappointment.css";

function BookAppointment() {
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  // ✅ Get today's date (for min attribute)
  const today = new Date().toISOString().split("T")[0];

  // time slots (static for demo, ideally should come from backend based on doctor's schedule and existing appointments)
  const timeSlots = [
    "10:00 AM","10:30 AM","11:00 AM","11:30 AM",
    "12:00 PM","12:30 PM","01:00 PM","01:30 PM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
    "04:00 PM","04:30 PM","05:00 PM"
  ];
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
  // Function to call backend and redirect to Stripe
const handlePayment = async () => {


  // ✅ validation
  if (!form.doctor || !form.date || !form.time) {
    alert("Please fill all fields");
    return;
  }
  if (!user || !user._id) {
  alert("User not found. Please login again.");
  return;
}

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorId: form.doctor,   // ✅ FIXED
        date: form.date,         // ✅ FIXED
        time: form.time,         // ✅ FIXED
        userId: user?._id, 
      }),
    });

    
   
    const data = await res.json();

    // Redirect user to Stripe
    window.location.href = data.url;

  } catch (err) {
    console.error("Payment error:", err);
  }
};
   



  
  return (
    <div className="booking-container">
      <div className="booking-card">

        <h2>Book Appointment</h2>

        <form>

          {/* Doctor Selection */}
          <label>Choose Doctor</label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Sharma- Cardiologist">Dr. Sharma- Cardiologist</option>
            <option value="Dr. Mehta-General Physician">Dr. Mehta- General Physician</option>
            <option value="Dr. Kapoor- Dermatologist">Dr. Kapoor- Dermatologist</option>
            <option value="Dr. Iyer- Neurologist">Dr. Iyer- Neurologist</option> 
            <option value="Dr. Singh- Orthopedic ">Dr. Singh- Orthopedic </option> 
            <option value="Dr. Patel- Pediatrician">Dr. Patel- Pediatrician</option> 
            <option value="Dr. Reddy- Psychiatrist">Dr. Reddy- Psychiatrist</option> 
            <option value="Dr. Khan- Radiologist">Dr. Khan- Radiologist</option> 
            <option value="Dr. Gupta- ENT Specialist">Dr. Gupta- ENT Specialist</option> 
            

            

           
          </select>

          {/* Date */}
          <label>Select Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={today}   // ✅ FUTURE ONLY
            required
          />

          {/* Time */}
          <label>Select Time</label>
          <select
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

          {/* Reason */}
          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Describe your issue..."
            value={form.reason}
            onChange={handleChange}
            required
          />

          {/* Buttons */}
          <div className="btn-group">
            <button type="button" className="submit-btn" onClick={handlePayment}>
              Book Now
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/patient")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  
  );
  
}

export default BookAppointment;