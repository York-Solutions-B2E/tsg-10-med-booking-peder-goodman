import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetUserState } from "../../store/reducers/userReducer";

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
