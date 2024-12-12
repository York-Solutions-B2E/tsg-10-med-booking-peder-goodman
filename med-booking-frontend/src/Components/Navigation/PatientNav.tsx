import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PatientLogoutButton } from "../buttons/PatientLogoutButton";

export default function AdminNav(props: NavigationProps) {
  const { isPatientAuthenticated } = props;
  const navigate = useNavigate();

  const handleClickViewAppointmentList = () => {
    // navigate to admin home (aka /admin)
    navigate("/my-appointments");
  };

  const handleClickHome = () => {
    console.log("Home clicked");
    // navigate("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        {/* <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickHome}
        >
          Home
        </Button> */}
        <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickViewAppointmentList}
        >
          View Your Appointments
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthCare.com
        </Typography>
        {isPatientAuthenticated ? <PatientLogoutButton /> : <></>}
      </Toolbar>
    </Box>
  );
}
