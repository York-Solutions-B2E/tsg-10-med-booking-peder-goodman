import { useEffect } from "react";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const AddDoctorForm = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  return <div>AddDoctorForm</div>;
};
