import { useEffect } from "react";
import axios from "axios";

export default function TestPage() {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/test",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return <h1>Check console for response</h1>;
}