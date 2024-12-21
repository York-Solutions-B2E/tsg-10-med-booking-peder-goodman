import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { AppointmentForm } from "../forms/AppointmentForm";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

export default function AddAppointmentModalButton() {
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmCancel, setConfirmCancelOpen] = useState(false);

  // * Form Modal handlers
  const handleOpenAppointmentFormModal = () => {
    setOpenForm(true);
  };

  const handleCancelSubmission = () => {
    setConfirmCancelOpen(true);
  };

  const handleCloseConfirmCancel = () => {
    setConfirmCancelOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelOpen(false);
    setOpenForm(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAppointmentFormModal}>
        Add Appointment
      </Button>
      {/* Testing dynamic modal sizes. this will be fullscreen modal, but if make this a component*/}
      <Dialog fullScreen maxWidth={false} open={openForm} onClose={handleCancelSubmission} TransitionComponent={ModalTransition}>
        {/* Leaving out formData and isEditing here */}
        <AppointmentForm onCancel={handleCancelSubmission} closeModal={handleConfirmCancel} />
      </Dialog>

      <GenericConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={openConfirmCancel}
        handleCancel={handleCloseConfirmCancel}
        handleConfirm={handleConfirmCancel}
        confirmButtonText="Yes"
      />
    </div>
  );
}
