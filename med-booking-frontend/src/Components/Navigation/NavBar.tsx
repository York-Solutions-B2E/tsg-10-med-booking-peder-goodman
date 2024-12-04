import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import DefaultNav from "./DefaultNav";
import PatientNav from "./PatientNav";

export default function NavBar() {
  const { isUserAuthenticated, userDetails } = useSelector(
    (state: AppState) => state.user
  );
  const userRole = userDetails?.role;

  let navDisplay = <DefaultNav />;

  if (userRole === "ADMIN") {
    navDisplay = <AdminNav isUserAuthenticated={isUserAuthenticated} />;
  } else if (userRole === "PATIENT") {
    navDisplay = <PatientNav isUserAuthenticated={isUserAuthenticated} />;
  } else {
    navDisplay = <DefaultNav />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">{navDisplay}</AppBar>
    </Box>
  );
}
