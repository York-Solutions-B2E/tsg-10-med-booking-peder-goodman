import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import AdminNav from "./AdminNav";
import DefaultNav from "./DefaultNav";

export default function NavBar() {
  // tools for redux

  // grab the user state from the store
  const { isUserAuthenticated, userDetails } = useSelector(
    (state: AppState) => state.user
  );

  const isAdmin =
    isUserAuthenticated && userDetails?.role === "ADMIN" ? true : false;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {isAdmin ? (
          <AdminNav isUserAuthenticated={isUserAuthenticated} />
        ) : (
          <DefaultNav />
        )}
      </AppBar>
    </Box>
  );
}
