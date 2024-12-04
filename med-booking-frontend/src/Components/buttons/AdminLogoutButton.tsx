import { Button } from "@mui/material";
import { store } from "../../store/store";
import { logoutUser } from "../../store/actions/userActions";

const handleLogout = () => {
  store.dispatch(logoutUser());
};

export const AdminLogoutButton = () => {
  return (
    <Button size="small" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};
