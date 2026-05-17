import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "../styles/auth.css";
import "../styles/login.css";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
       
      const res = await API.post("/auth/login", {
        email,
        password,
        role,
      });
          // console.log removed       // ✅ check axios response
    // console.log removed           // ✅ check actual data


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name); 
     localStorage.setItem("user", JSON.stringify(res.data));


     // console.log removed // ✅ confirm storage 


      // redirect
      if (res.data.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }

    } catch (err) {
      //  error msg from backend or generic message
      
    setError(err.response?.data?.message ||  err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      
      <form className="auth-box" onSubmit={handleLogin}>
     
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
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

        <button type="submit">Login</button>

        <div className="link" onClick={() => navigate("/register")}>
          Don't have an account? Sign up
        </div>
      </form>
    </div>
  );
}