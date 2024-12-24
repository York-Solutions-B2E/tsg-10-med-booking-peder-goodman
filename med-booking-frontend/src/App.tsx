import NavBar from "./Components/Navigation/NavBar";
import AdminPage from "./Containers/AdminPage";
import "./css/App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { AppointmentPage } from "./Containers/AppointmentPage";
import { LoginPage } from "./Containers/LoginPage";
import { Layout } from "./hoc/Layout";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"PATIENT"} />}>
            <Route path="/my-appointments" element={<AppointmentPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
