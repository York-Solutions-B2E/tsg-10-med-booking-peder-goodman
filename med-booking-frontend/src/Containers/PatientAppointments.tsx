import { useEffect } from "react";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const PatientAppointments = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  return <div>PatientAppointments</div>;
};
