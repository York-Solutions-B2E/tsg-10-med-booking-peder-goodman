import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/userActions";
import { store } from "../../store/store";

export const AdminLogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    store.dispatch(logoutUser());
    navigate("/home");
  };

  return (
    <Button size="small" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};
