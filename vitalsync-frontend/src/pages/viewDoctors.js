import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewDoctors() {
  const navigate = useNavigate();

  const doctors = [
    {
      name: "Dr. Mehta",
      specialty: "General Physician",
      about: "Handles common illnesses, fever, infections, and general health checkups.",
    },
    {
      name: "Dr. Sharma",
      specialty: "Cardiologist",
      about: "Expert in heart diseases, blood pressure, and cardiac care.",
    },
    {
      name: "Dr. Kapoor",
      specialty: "Dermatologist",
      about: "Treats skin, hair, and nail problems like acne and allergies.",
    },
    {
      name: "Dr. Iyer",
      specialty: "Neurologist",
      about: "Deals with brain and nerve issues like migraines and seizures.",
    },
    {
      name: "Dr. Singh",
      specialty: "Orthopedic",
      about: "Specialist in bones, joints, fractures, and muscle pain.",
    },
    {
      name: "Dr. Reddy",
      specialty: "Pediatrician",
      about: "Provides care for infants, children, and teenagers.",
    },
    {
      name: "Dr. Khan",
      specialty: "Gynecologist",
      about: "Focuses on women's health, pregnancy, and reproductive care.",
    },
    {
      name: "Dr. Das",
      specialty: "ENT Specialist",
      about: "Treats ear, nose, and throat conditions like sinus and hearing issues.",
    },
    {
      name: "Dr. Verma",
      specialty: "Psychiatrist",
      about: "Helps manage mental health issues like stress, anxiety, and depression.",
    },
    {
      name: "Dr. Patel",
      specialty: "Gastroenterologist",
      about: "Handles digestion problems, liver issues, and stomach disorders.",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Doctors</h2>

      <button onClick={() => navigate("/patient")} style={{ marginBottom: "15px" }}>
        ⬅ Back to Dashboard
      </button>

      {doctors.map((doc, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{doc.name}</h3>
          <p><strong>Specialty:</strong> {doc.specialty}</p>
          <p>{doc.about}</p>
        </div>
      ))}
    </div>
  );
}