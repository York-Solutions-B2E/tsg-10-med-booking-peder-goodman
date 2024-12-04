import { Button } from "@mui/material";

// login/logout functions
const handleLogin = () => {
  // TODO: refactor into async Thunk
  // grab the port number from the window.location
  let port = window.location.port ? ":" + window.location.port : "";

  // set the port to 8080 if it's 3000
  if (port === ":3000") {
    port = ":8080";
  }
  console.log("location is: ", window.location.hostname);

  // redirect to the Okta login page (aka an api/<privateRoute>)
  window.location.href = `//${window.location.hostname}${port}/api/auth/login`;
};

export const AdminLoginButton = () => {
  return (
    <Button size="small" color="inherit" onClick={handleLogin}>
      Admin Login
    </Button>
  );
};
