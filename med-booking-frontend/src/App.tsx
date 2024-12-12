import NavBar from "./Components/Navigation/NavBar";
import AdminHome from "./Containers/AdminHome";
import "./css/App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./Containers/HomePage";
import { PatientAppointments } from "./Containers/PatientAppointments";
import { Layout } from "./hoc/Layout";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
            <Route path="/admin" element={<AdminHome />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"PATIENT"} />}>
            <Route path="/my-appointments" element={<PatientAppointments />} />
          </Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
