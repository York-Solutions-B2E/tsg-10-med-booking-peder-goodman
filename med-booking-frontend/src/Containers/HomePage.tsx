// aka login

import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../Components/forms/LoginForm";
import { SignupForm } from "../Components/forms/SignupForm";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const HomePage = () => {
  const navigate = useNavigate();
  const { userDetails, isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const userRole = userDetails?.role;
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  useEffect(() => {
    if (isUserAuthenticated) {
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "PATIENT") {
        navigate("/my-appointments");
      }
    }
  }, [isUserAuthenticated, userRole]);

  const loginCardStyling = {
    maxWidth: "400px",
    margin: "60px auto 20px",
    padding: "30px",
    boxShadow: "0px 0px 30px 5px rgba(0,0,0,0.14)",
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

  return (
    <>
      <Card sx={loginCardStyling}>
        <h1>Patient Sign-in</h1>
        {showSignup ? <NewUserPrompt /> : <ExistingUserPrompt />}
        {showSignup ? <SignupForm /> : <LoginForm />}
        <p>
          By {termsMessaging}, you agree to accept our{" "}
          <a
            href="https://genius.com/Rick-astley-never-gonna-give-you-up-lyrics"
            target="_blank"
          >
            terms and conditions.
          </a>
        </p>
      </Card>
    </>
  );
};
