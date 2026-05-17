import { useEffect, useState } from "react";
import "../styles/doctordashboard.css";
import { useNavigate } from "react-router-dom";



export default function DoctorDashboard() {
    const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};
    const [name, setName] = useState("");
        useEffect(() => {
        const userName = localStorage.getItem("name");
            setName(userName);
        }, []);
  const [available, setAvailable] = useState(true);

  return (
    <div className="doc-container">

      {/* HEADER */}
      <div className="doc-header">
        <h2>VitalSync</h2>
        <div className="doc-profile">
           
            <span><div className="doc-header">


  <button onClick={handleLogout} className="logout-btn">
    Logout
  </button>
</div></span>
        </div>
      </div>

      {/* WELCOME */}
      <h1>Welcome, Dr. {name}!</h1>
      <p className="sub">Cardiology Department</p>

      {/* AVAILABILITY */}
      <div className="availability-card">
        <div>
          <h3>Availability Status</h3>
             <span className={available ? "status on" : "status off"}>
              {available ? "Available" : "Not Available"}
              </span>    
        

        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
          />
          <span className="slider"></span>
        </label>

      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card">Today's Appointments <span>0</span></div>
        <div className="card">Completed Today <span>0</span></div>
        <div className="card">Total Patients <span>1</span></div>
        <div className="card">Upcoming <span>0</span></div>
      </div>

      {/* MAIN GRID */}
      <div className="grid">

        {/* SCHEDULE */}
        <div className="box">
          <h3>Today's Schedule</h3>
          <p>No appointments scheduled</p>
        </div>

        {/* UPCOMING */}
        <div className="box">
          <h3>Upcoming Appointments</h3>
          <p>No upcoming visits</p>
        </div>

        {/* PATIENTS */}
        <div className="box full">
          <h3>Recent Patients</h3>

          <div className="patient">
            <div>
              <h4>John Smith</h4>
              <p>Last visit: Apr 20, 2026</p>
            </div>
            <button>View Records</button>
          </div>

        </div>

      </div>
    </div>
  );
}