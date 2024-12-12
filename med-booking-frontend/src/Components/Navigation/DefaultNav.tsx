import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { AdminLoginButton } from "../buttons/AdminLoginButton";
import { log } from "console";

export default function DefaultNav() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    console.log("Home clicked");
    // navigate("/my-appointments");
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthCare.com
        </Typography>
        <AdminLoginButton />
      </Toolbar>
    </Box>
  );
}
