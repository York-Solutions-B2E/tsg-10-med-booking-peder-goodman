import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AdminLoginButton } from "../buttons/AdminLoginButton";
import { AdminLogoutButton } from "../buttons/AdminLogoutButton";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../store/reducers/userReducer";
import { PatientLogoutButton } from "../buttons/PatientLogoutButton";

export default function AdminNav(props: NavigationProps) {
  const { isPatientAuthenticated } = props;
  const navigate = useNavigate();

  const handleClickViewAppointmentList = () => {
    // navigate to admin home (aka /admin)
    navigate("/my-appointments");
  };

  const handleClickAddAppointment = () => {
    // navigate to admin home (aka /admin)
    navigate("/create-appointment");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickViewAppointmentList}
        >
          View Your Appoingments
        </Button>
        <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickAddAppointment}
        >
          Add Appointment
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthCare.com
        </Typography>
        {isPatientAuthenticated ? <PatientLogoutButton /> : <></>}
      </Toolbar>
    </Box>
  );
}
