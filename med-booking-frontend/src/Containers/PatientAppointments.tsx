import { Box } from "@mui/material";
import { useEffect } from "react";
import CreateAppointmentModalButton from "../Components/buttons/CreateAppointmentModalButton";
import CustomDataGrid from "../Components/data-display/PatientAppointmentDataGrid";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const PatientAppointments = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  const appointmentPageStyling = {
    padding: "30px 60px",
  };

  return (
    <Box sx={appointmentPageStyling}>
      <CreateAppointmentModalButton />
      <CustomDataGrid />
    </Box>
  );
};
