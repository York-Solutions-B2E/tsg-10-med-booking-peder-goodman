import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

const AdminHome = () => {
  const { userDetails, isLoading, isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  const message = isUserAuthenticated ? (
    <h2>Welcome, {userDetails?.firstName}!</h2>
  ) : (
    <p>Please log in.</p>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        {message}
      </Box>
    </div>
  );
};

export default AdminHome;
