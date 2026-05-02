// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import Dashboard from "./pages/dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
// protected route component
import ProtectedRoute from "./components/ProtectedRoute";
// pages (keep adding as  you create them)
import Login from "./pages/login";
import Register from "./pages/register";
import PatientDashboard from "./pages/patientdashboard";
import DoctorDashboard from "./pages/doctordashboard";
import BookAppointment from "./pages/bookappointment";
import Success from "./pages/Success";
import ViewDoctors from "./pages/viewDoctors";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* public routes */}
         <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/doctors" element={<ViewDoctors />} />
          {/* protected routes */}
        <Route path="/patient" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
        <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/book-appointment"element={<ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;