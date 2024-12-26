import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { ButtonWithText } from "../Components/buttons/ButtonWithText";
import DoctorDataGrid from "../Components/data-display/DoctorDataGrid";
import { DoctorForm } from "../Components/forms/DoctorForm";
import { FormModal } from "../Components/modals/FormModal";
import { getSpecializationsAndDoctors } from "../store/actions/doctorActions";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";
import { useCustomModal } from "../utils/useCustomModal";

const AdminPage = () => {
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
      <ButtonWithText variant={"contained"} buttonText="Add Doctor" onClick={openFormModal} startIcon={<AddIcon />} />
      <FormModal open={isFormOpen} onClose={closeFormModal} maxWidth={"sm"} FormComponent={DoctorForm} />
      <DoctorDataGrid />
    </Box>
  );
};

export default AdminPage;
