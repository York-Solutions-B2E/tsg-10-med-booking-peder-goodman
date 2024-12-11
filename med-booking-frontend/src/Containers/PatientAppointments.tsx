import { Box } from "@mui/material";
import { useEffect } from "react";
import CreateAppointmentModal from "../Components/modals/CreateAppointmentModal";
import CustomDataGrid from "../Components/PatientAppointmentDataGrid";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const PatientAppointments = () => {
  useEffect(() => {
    store.dispatch(checkUserAuthentication());
  }, []);

  const appointmentPageStyling = {
    padding: "30px 60px",
  };

  const handleClickAddAppointment = () => {};

  return (
    <Box sx={appointmentPageStyling}>
      <CreateAppointmentModal />
      <CustomDataGrid />
    </Box>
  );
};
