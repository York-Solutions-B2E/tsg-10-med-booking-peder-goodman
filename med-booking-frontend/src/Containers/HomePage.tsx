// aka login

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const HomePage = () => {
  const navigate = useNavigate();
  const { userDetails, isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const userRole = userDetails?.role;

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
  }, []);

  return (
    <>
      <div>HomePage</div>
      <div>Looks like you're not logged in!!</div>
      <div>Please Login!</div>
    </>
  );
};
