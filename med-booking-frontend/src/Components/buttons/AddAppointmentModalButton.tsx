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
  const openFormModal = () => {
    setOpenForm(true);
  };

  const triggerCancelDialog = () => {
    setConfirmCancelOpen(true);
  };

  const closeCancelDialog = () => {
    setConfirmCancelOpen(false);
  };

  const confirmCancellation = () => {
    setConfirmCancelOpen(false);
    setOpenForm(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openFormModal}>
        Add Appointment
      </Button>

      <Dialog fullScreen maxWidth={false} open={openForm} onClose={triggerCancelDialog} TransitionComponent={ModalTransition}>
        {/* Leaving out formData and isEditing here */}
        <AppointmentForm onCancel={triggerCancelDialog} closeModal={confirmCancellation} />
      </Dialog>

      <GenericConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={openConfirmCancel}
        handleCancel={closeCancelDialog}
        handleConfirm={confirmCancellation}
        confirmButtonText="Yes"
      />
    </div>
  );
}
