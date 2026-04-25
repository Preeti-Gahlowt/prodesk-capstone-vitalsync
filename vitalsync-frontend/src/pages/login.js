import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { ...form, role }
      );

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };



  return (
    <div className="login-wrapper">
      <div className="brand">
        <div className="brand-icon">+</div>
        <h1>VitalSync</h1>
        <p>Healthcare Management System</p>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className="sub">Sign in to access your dashboard</p>

        {/* Toggle */}
        <div className="role-toggle">
          <div
            className={`toggle-option ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            Patient
          </div>
          <div
            className={`toggle-option ${role === "doctor" ? "active" : ""}`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </div>
        </div>

        {/* Inputs */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="john.smith@email.com"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button className="login-btn">Sign In</button>
        <div className="signup-link">
            Don’t have an account?{" "}
  <span onClick={() => navigate("/register")}>
    Sign up
  </span>
</div>
      </form>
    </div>
  );
}