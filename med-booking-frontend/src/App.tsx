import "./App.css";
import NavBar from "./Components/Navigation/NavBar";
import AdminHome from "./Containers/AdminHome";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route element={<ProtectedRoute requiredRole={"ADMIN"} />}>
            <Route path="/" element={<AdminHome />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole={"PATIENT"} />}>
            {/* <Route path="/" element={<PatientAppointments />} /> */}
          </Route>
          {/* <Route path="/home" element={<LoginPage />} /> */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
