import EditIcon from "@mui/icons-material/Edit";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { DoctorForm } from "../forms/DoctorForm";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";

const EditAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;

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

  const buttonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <>
      <IconButton sx={buttonStyle} color="primary" onClick={openFormModal}>
        <Tooltip title="Edit Doctor">
          <EditIcon />
        </Tooltip>
      </IconButton>

      <Dialog fullWidth maxWidth="sm" open={openForm} onClose={triggerCancelDialog} TransitionComponent={ModalTransition}>
        <DoctorForm editFormData={doctor} isEditing={true} onCancel={triggerCancelDialog} closeModal={confirmCancellation} />
      </Dialog>

      <ConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={confirmCancelOpen}
        handleCancel={closeCancelDialog}
        handleConfirm={confirmCancellation}
        confirmButtonText="Yes"
      />
    </>
  );
};

export default EditAppointmentModalButton;
