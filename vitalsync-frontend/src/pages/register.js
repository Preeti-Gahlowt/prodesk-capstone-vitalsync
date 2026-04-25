import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css"; // reuse same CSS

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        role,
      });

      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Branding */}
      <div className="brand">
        <div className="brand-icon">+</div>
        <h1>VitalSync</h1>
        <p>Healthcare Management System</p>
      </div>

      {/* Card */}
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="sub">Sign up to get started</p>

        {/* Role Toggle */}
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
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

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
            placeholder="Create a password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>


        {/* Button */}
        <button className="login-btn">Sign Up</button>

        {/* Login Link */}
        <div className="signup-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}