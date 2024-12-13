import { Box } from "@mui/material";
import { useEffect } from "react";
import AddAppointmentModalButton from "../Components/buttons/AddAppointmentModalButton";
import PatientAppointmentDataGrid from "../Components/data-display/PatientAppointmentDataGrid";
import { getSpecializationsAndDoctors } from "../store/actions/doctorActions";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const PatientAppointments = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
    store.dispatch(getSpecializationsAndDoctors());
  }, []);

  const appointmentPageStyling = {
    padding: "30px 60px",
  };

  return (
    <Box sx={appointmentPageStyling}>
      <AddAppointmentModalButton />
      <PatientAppointmentDataGrid />
    </Box>
  );
};
