import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const navigate = useNavigate();

  // console.log removed
  useEffect(() => {

  const verifyPayment = async () => {
    
    try {
      const res = await fetch(`http://localhost:5000/api/payment/verify/${sessionId}`);
        const data = await res.json();

        // console.log removed
      } catch (err) {
        console.error("Verification error:", err);
      }
    };

    verifyPayment();
  }, [params]);

 setTimeout(() => {
  navigate("/patient");
}, 3000);


  // ✅ THIS PART IS IMPORTANT (UI MUST RETURN)
   return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Your appointment has been booked.</p>

      <button onClick={() => navigate("/patient")}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default Success;