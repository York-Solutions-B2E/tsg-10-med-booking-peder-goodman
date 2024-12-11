import { useEffect } from "react";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const AddAppointmentForm = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  return <div>This will likely get deleted soon! </div>;
};
