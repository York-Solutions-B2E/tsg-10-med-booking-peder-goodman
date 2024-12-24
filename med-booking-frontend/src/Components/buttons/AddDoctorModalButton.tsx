import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { DoctorForm } from "../forms/DoctorForm";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";

export default function AddDoctorModalButton() {
  const [openForm, setOpenForm] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

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
        Add New Doctor
      </Button>

      <Dialog fullWidth maxWidth="sm" open={openForm} onClose={triggerCancelDialog} TransitionComponent={ModalTransition}>
        {/* Leaving out formData and isEditing here */}
        <DoctorForm onCancel={triggerCancelDialog} closeModal={confirmCancellation} />
      </Dialog>

      <ConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={confirmCancelOpen}
        handleCancel={closeCancelDialog}
        handleConfirm={confirmCancellation}
        confirmButtonText="Yes"
      />
    </div>
  );
}
