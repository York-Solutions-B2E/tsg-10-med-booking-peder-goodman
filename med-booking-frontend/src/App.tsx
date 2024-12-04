import "./App.css";
import NavBar from "./Components/Navigation/NavBar";
import AdminHome from "./Containers/AdminHome";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<AdminHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
