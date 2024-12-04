import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AdminLoginButton } from "../buttons/AdminLoginButton";

export default function DefaultNav() {
  const navigate = useNavigate();

  const handleClickMyAppointments = () => {
    navigate("/my-appointments");
  };

  const handleClickCreateAppointment = () => {
    navigate("/create-appointment");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickMyAppointments}
        >
          My Appointments
        </Button>
        <Button
          sx={{ color: "inherit", textTransform: "capitalize" }}
          onClick={handleClickCreateAppointment}
        >
          Create Appointment
        </Button>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthCare.com
        </Typography>
        <AdminLoginButton />
      </Toolbar>
    </Box>
  );
}
