import { Button } from "@mui/material";
import { logoutUser } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { resetUserState } from "../../store/reducers/userReducer";
import { useDispatch } from "react-redux";

export const PatientLogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetUserState());
  };

  return (
    <Button size="small" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};
