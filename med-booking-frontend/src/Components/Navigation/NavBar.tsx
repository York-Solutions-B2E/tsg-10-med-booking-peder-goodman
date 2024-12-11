import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import DefaultNav from "./DefaultNav";
import PatientNav from "./PatientNav";

export default function NavBar() {
  const { isPatientAuthenticated, isUserAuthenticated, userDetails } = useSelector(
    (state: AppState) => state.user
  );
  const userRole = userDetails?.role;

  let navDisplay = <DefaultNav />;

  if (userRole === "ADMIN") {
    navDisplay = <AdminNav isUserAuthenticated={isUserAuthenticated} isPatientAuthenticated={isPatientAuthenticated} />;
  } else if (userRole === "PATIENT") {
    navDisplay = <PatientNav isUserAuthenticated={isPatientAuthenticated} isPatientAuthenticated={isPatientAuthenticated} />;
  } else {
    navDisplay = <DefaultNav />;
  }

  return (
    <Box sx={{ flexGrow: 1, position: "fixed",  top: 0, width: "100%", zIndex: 100}}>
      <AppBar position="static">{navDisplay}</AppBar>
    </Box>
  );
}
