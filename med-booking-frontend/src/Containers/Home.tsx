import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Button } from "@mui/material";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const [cookies] = useCookies(["XSRF-TOKEN"]);

  // get User data from the server/Okta
  const getUserData = async () => {
    setLoading(true);
    try {
      // fetch user data returns response.data
      const response = await axios.get("api/user", { withCredentials: true });
      // check if response is ok
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("response is: ", response);
      console.log("fetchUserData response.data", response.data);
      const user = response.data;
      console.log("Logged in user: ", user);

      // set user data to response.data
      if (user === "") {
        setAuthenticated(false);
      } else {
        console.log("User to set is: ", user);

        setUser(user);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    // grab the port number from the window.location
    let port = window.location.port ? ":" + window.location.port : "";

    // set the port to 8080 if it's 3000
    if (port === ":3000") {
      port = ":8080";
    }
    // redirect to the Okta login page (aka an api/<privateRoute>)
    window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;
    // window.location.href = `//${window.location.hostname}${port}/api/private`;
  };

  const logout = async () => {
    const response = await axios.post("/api/logout", null, {
      withCredentials: true,
      headers: { "X-XSRF-TOKEN": cookies["XSRF-TOKEN"] },
    });

    console.log("Logout response:", response);

    if (response.status !== 200) {
      console.log("Error logging out: ", response.status);
      throw new Error(`HTTP error! status: ${response}`);
    } else {
      // handle redirect to home page/ logout page
      console.log("Logged out successfully");

      window.location.href =
        `${response.data.logoutUrl}?id_token_hint=${response.data.idToken}` +
        `&post_logout_redirect_uri=${window.location.origin}`;
    }
  };

  useEffect(() => {
    getUserData();
  }, [setAuthenticated, setLoading, setUser]);

  const message = user ? <h2>Welcome, {user.name}!</h2> : <p>Please log in.</p>;

  const button = authenticated ? (
    <div>
      <Button color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  ) : (
    <Button color="primary" onClick={login}>
      Login
    </Button>
  );

  if (loading) {
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
        {button}
      </Box>
    </div>
  );
};

export default Home;
