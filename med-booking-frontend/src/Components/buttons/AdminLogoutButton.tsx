import { Button } from "@mui/material";
import { logoutUser } from "../../../store/actions/userActions";
import { store } from "../../../store/store";

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
