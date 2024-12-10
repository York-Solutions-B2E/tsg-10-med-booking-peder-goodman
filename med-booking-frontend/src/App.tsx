import NavBar from "./Components/Navigation/NavBar";
import AdminHome from "./Containers/AdminHome";
import "./css/App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { AddAppointmentForm } from "./Containers/AddAppointmentForm";
import { AddDoctorForm } from "./Containers/AddDoctorForm";
import { HomePage } from "./Containers/HomePage";
import { PatientAppointments } from "./Containers/PatientAppointments";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/add-doctor" element={<AddDoctorForm />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole={"PATIENT"} />}>
          <Route path="/my-appointments" element={<PatientAppointments />} />
          <Route path="/create-appointment" element={<AddAppointmentForm />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
