import EditIcon from "@mui/icons-material/Edit";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { AppointmentForm } from "../forms/AppointmentForm";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

const EditAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (appointment.appointmentStatus === "CANCELED") {
      setIsButtonDisabled(true);
    }

    const isAppointmentDateInThePast = dayjs(appointment.appointmentDate + appointment.appointmentTime).isBefore(dayjs());

    if (isAppointmentDateInThePast) {
      setIsButtonDisabled(true);
    }
  }, []);

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
      <IconButton disabled={isButtonDisabled} sx={buttonStyle} color="primary" onClick={openFormModal}>
        <Tooltip title="Edit Appointment">
          <EditIcon />
        </Tooltip>
      </IconButton>

      <Dialog fullWidth maxWidth="sm" open={openForm} onClose={triggerCancelDialog} TransitionComponent={ModalTransition}>
        <AppointmentForm onCancel={triggerCancelDialog} editFormData={appointment} isEditing={true} closeModal={confirmCancellation} />
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
