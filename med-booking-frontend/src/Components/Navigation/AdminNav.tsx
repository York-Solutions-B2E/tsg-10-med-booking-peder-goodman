import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AdminLoginButton } from "../buttons/AdminLoginButton";
import { AdminLogoutButton } from "../buttons/AdminLogoutButton";

export default function AdminNav(props: NavigationProps) {
  const { isUserAuthenticated } = props;
  const navigate = useNavigate();

  const handleClickViewDoctorList = () => {
    // navigate to admin home (aka /admin)
    navigate("/admin");
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
          onClick={handleClickViewDoctorList}
        >
          View Doctor List
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthCare.com
        </Typography>
        {isUserAuthenticated ? <AdminLogoutButton /> : <AdminLoginButton />}
      </Toolbar>
    </Box>
  );
}
