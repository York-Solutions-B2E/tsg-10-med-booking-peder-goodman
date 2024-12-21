import EditIcon from "@mui/icons-material/Edit";
import { Dialog, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { DoctorForm } from "../forms/DoctorForm";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

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

  return (
    <>
      <GridActionsCellItem
        icon={
          <Tooltip title="Edit Doctor">
            <EditIcon />
          </Tooltip>
        }
        label="Save"
        sx={{
          color: "primary.main",
        }}
        onClick={openFormModal}
      />

      <Dialog fullWidth maxWidth="sm" open={openForm} onClose={triggerCancelDialog} TransitionComponent={ModalTransition}>
        <DoctorForm editFormData={doctor} isEditing={true} onCancel={triggerCancelDialog} closeModal={confirmCancellation} />
      </Dialog>

      <GenericConfirmActionModal
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
