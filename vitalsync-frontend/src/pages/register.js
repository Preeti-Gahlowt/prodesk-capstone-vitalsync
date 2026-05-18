import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        name,
        role,
        email,
        password,
        
      });

      alert("Registered successfully");
      navigate("/login");

    } catch (err) {
       setError(err.response?.data?.message ||  err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>

        <div className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </div>
      </form>
    </div>
  );
}