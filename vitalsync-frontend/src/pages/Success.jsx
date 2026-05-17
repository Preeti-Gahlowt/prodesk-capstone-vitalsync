import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Success = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/verify/${sessionId}`);
        await res.json();
      } catch (err) {
        console.error("Verification error:", err);
      }
    };

    verifyPayment();

    const timer = setTimeout(() => {
      navigate(`${process.env.REACT_APP_API_URL}/patient`);
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [sessionId, navigate]); // ✅ all used values listed

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Your appointment has been booked.</p>
      <button onClick={() => navigate(`${process.env.REACT_APP_API_URL}/patient`)}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;