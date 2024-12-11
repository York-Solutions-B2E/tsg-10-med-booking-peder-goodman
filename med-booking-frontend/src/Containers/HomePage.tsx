// aka login

import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../Components/forms/LoginForm";
import { SignupForm } from "../Components/forms/SignupForm";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const HomePage = () => {
  const navigate = useNavigate();
  const { userDetails, isUserAuthenticated, isPatientAuthenticated } =
    useSelector((state: RootState) => state.user);

  const userRole = userDetails?.role;
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  useEffect(() => {
    if (isUserAuthenticated || isPatientAuthenticated) {
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "PATIENT") {
        navigate("/my-appointments");
      }
    }
  }, [isUserAuthenticated, userRole]);

  const homePageStyling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const loginCardStyling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "450px",
    margin: "100px auto 20px",
    padding: "48px 0px",

    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.14)",
    borderRadius: "10px",
  };

  const backgroundImage = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundImage:
      // "url(https://blog.cincinnatichildrens.org/wp-content/uploads/2023/09/blog-fall.jpg)",
      "url(https://www.healthpartners.com/content/dam/brand-identity/photography/stock/lifestyle/family/getty1350125891-3000x2000.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  };

  const ExistingUserPrompt = () => {
    return (
      <p>
        New here? <button onClick={() => setShowSignup(true)}>Sign-up</button>
      </p>
    );
  };

  const NewUserPrompt = () => {
    return (
      <p>
        Existing User?{" "}
        <button onClick={() => setShowSignup(false)}>Sign-in</button>
      </p>
    );
  };

  const termsMessaging = showSignup ? "signing up" : "signing in";
  const headerMessaging = showSignup ? "Patient Sign-up" : "Patient Sign-in";

  return (
    <>
      <Box sx={homePageStyling}>
        <Card sx={loginCardStyling}>
          <h1 style={{ marginTop: "0px" }}>{headerMessaging}</h1>
          {showSignup ? <NewUserPrompt /> : <ExistingUserPrompt />}
          {showSignup ? <SignupForm /> : <LoginForm />}
          <p style={{ margin: "16px 32px" }}>
            By {termsMessaging}, you agree to accept our{" "}
            <a
              href="https://genius.com/Rick-astley-never-gonna-give-you-up-lyrics"
              target="_blank"
            >
              terms and conditions.
            </a>
          </p>
        </Card>
      </Box>
      <Box sx={backgroundImage} />
    </>
  );
};
