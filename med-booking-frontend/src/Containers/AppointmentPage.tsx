import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { ButtonWithText } from "../Components/buttons/ButtonWithText";
import PatientAppointmentDataGrid from "../Components/data-display/PatientAppointmentDataGrid";
import { AppointmentForm } from "../Components/forms/AppointmentForm";
import { FormModal } from "../Components/modals/FormModal";
import { useCustomModal } from "../Components/modals/useCustomModal";
import { getSpecializationsAndDoctors } from "../store/actions/doctorActions";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

export const AppointmentPage = () => {
  const [isFormOpen, openFormModal, closeFormModal] = useCustomModal();

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
    store.dispatch(getSpecializationsAndDoctors());
  }, []);

  const appointmentPageStyling = {
    padding: "30px 60px",
  };

  return (
    <Box sx={appointmentPageStyling}>
      <ButtonWithText variant={"contained"} buttonText="Add Appointment" onClick={openFormModal} startIcon={<AddIcon />} />
      <FormModal open={isFormOpen} onClose={closeFormModal} fullScreen={true} FormComponent={AppointmentForm} />
      <PatientAppointmentDataGrid />
    </Box>
  );
};
