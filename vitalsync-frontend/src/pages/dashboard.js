import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/test",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },  );     //here I have deleted []

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{
      background: "#f1faee",
      height: "100vh",
      padding: "30px"
    }}>
      <h1 style={{ color: "#e63946" }}>Dashboard</h1>

      <p>{data}</p>

      <button onClick={logout} style={{
        background: "#1d1d1d",
        marginTop: "20px"
      }}>
        Logout
      </button>
    </div>
  );
}