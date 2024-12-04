import { Button } from "@mui/material";
import { logoutUser } from "../../store/actions/userActions";
import { store } from "../../store/store";

export const AdminLogoutButton = () => {
  const handleLogout = () => {
    store.dispatch(logoutUser());
  };

  return (
    <Button size="small" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};
