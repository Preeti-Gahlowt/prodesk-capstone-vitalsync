import "../styles/patientdashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function PatientDashboard() {

  // 🔥 Get logged-in user from localStorage
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const userId = user?._id;
    const navigate = useNavigate();


  const [appointments, setAppointments] = useState([]);


 useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/${userId}`);
      const data = await res.json();

      // console.log removed // debug

      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  if (userId) {
    fetchAppointments();
  }
}, [userId]);



// AI Symptom Analyzer

const [showAIBox, setShowAIBox] = useState(false);
const [symptoms, setSymptoms] = useState("");
const [aiResult, setAiResult] = useState("");
const getAISymptoms = async () => {
  try {
    if (!symptoms.trim()) {
      alert("Please enter symptoms");
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/ai/suggest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: symptoms }),
    });

    const data = await res.json();

    setAiResult(data.specialist);

  } catch (err) {
    console.error(err);
    alert("AI failed");
  }
};

const handleCancel = async (id) => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
      method: "DELETE",
    });

    // ✅ update UI without reload
    setAppointments((prev) =>
      prev.filter((appt) => appt._id !== id)
    );

  } catch (err) {
    console.error("Cancel error:", err);
  }
};

const handleReschedule = async (id) => {
  const newDate = prompt("Enter new date (YYYY-MM-DD)");
  const newTime = prompt("Enter new time");

  if (!newDate || !newTime) return;

  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date: newDate, time: newTime }),
  });

  const updated = await res.json();

  // Update UI without reload
  setAppointments((prev) =>
    prev.map((appt) =>
      appt._id === id ? updated : appt
    )
  );
};

const handleLogout = () => {
  localStorage.clear();   // removes token, name, role
  navigate("/login");
};
    const [name, setName] = useState("");
useEffect(() => {
  const userName = localStorage.getItem("name");
  setName(userName);
}, []);

  return (
    <div className="patient-container">

      {/* HEADER */}
      <div className="header">
        <h2>VitalSync</h2>
        <span><div className="header">
  

  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
</div></span>
      </div>

      <h1>Welcome back, {name}</h1>
      <p className="sub">Here's an overview of your health</p>

      {/* STATS */}
      <div className="stats">

        {/* list of Doctors */}
       <div
  onClick={() => navigate("/doctors")}
className="card" style={{ cursor: "pointer", color: "red" }}>   

  View Available DOCTORS
</div>
        <div className="card">Prescriptions <span>2</span></div>
        <div className="card">Medical Records <span>5</span></div>
        <div className="card">Health Score <span>85%</span></div>
      </div>

      <div className="grid">

        {/* APPOINTMENTS */}
        <div className="box">
          <div className="flex">
            <h3>Upcoming Appointments</h3>
           {appointments.length === 0 ? (
  <p>No upcoming appointments</p>
) : (
  appointments.map((appt) => (
    <div key={appt._id} className="appointment-card">
      <p>Doctor: {appt.doctorId}</p>
      <p>Date: {appt.date}</p>
      <p>Time: {appt.time}</p>

      <button onClick={() => handleCancel(appt._id)}>
        Cancel
      </button>

      <button onClick={() => handleReschedule(appt._id)}>
        Reschedule
      </button>
    </div>
  ))
)}
           <button className="book-btn"
            onClick={() => navigate("/book-appointment")}>
              Book New Appointment
            </button>
          </div>

          
        </div>

        {/* PRESCRIPTIONS */}
        <div className="box">
          <h3>Active Prescriptions</h3>

          <div className="prescription">
            <p>Lisinopril - 10mg</p>
            <small>Daily</small>
          </div>

          <div className="prescription">
            <p>Aspirin - 81mg</p>
            <small>Daily</small>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="box ">
          <h3>Recent Medical History</h3>

          <div className="timeline-item red">
            <h4>Hypertension</h4>
            <p>Started medication</p>
          </div>

          <div className="timeline-item blue">
            <h4>Blood Test</h4>
            <p>Normal results</p>
          </div>

          <div className="timeline-item green">
            <h4>Vaccination</h4>
            <p>Flu shot</p>
          </div>
         
        </div>
         <div className="box">
          <div>
            <button className="book-btn" onClick={() => setShowAIBox(!showAIBox)}>
                   AI Symptom Analyzer
            </button>
          </div>
          {showAIBox && (
  <div className="ai-box">
    
    <textarea
      placeholder="Enter your symptoms..."
      value={symptoms}
      onChange={(e) => setSymptoms(e.target.value)}
    />

    <button onClick={getAISymptoms}>
      Get Answer
    </button>

    {aiResult && (
      <div className="ai-result">
        <h4>Recommended Specialist:</h4>
        <p>{aiResult}</p>

        <p style={{ fontSize: "12px", color: "gray" }}>
          ⚠️ This is AI-generated suggestion.
        </p>
      </div>
    )}
  </div>
)}
        </div>

      </div>
    </div>
  );
}