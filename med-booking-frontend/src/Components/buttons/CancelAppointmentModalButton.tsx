import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";

const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelClickButton = () => {
    setConfirmCancelOpen(true);
  };

  // * Confirmation Modal handlers
  const dismissConfirmation = () => {
    setConfirmCancelOpen(false);
  };

  const submitConfirmation = () => {
    setConfirmCancelOpen(false);
    console.log("Appointment Cancelled:", appointment.id);
    // TODO: Submit cancel appointment to backend
    // store.dispatch(cancelAppointment(appointment.id));
  };

  return (
    <>
      <GridActionsCellItem
        icon={
          <Tooltip title="Cancel Appointment">
            <DoNotDisturbIcon />
          </Tooltip>
        }
        label="Cancel"
        className="textPrimary"
        onClick={handleCancelClickButton}
        color="error"
      />
      <ConfirmationModal
        color="error"
        message="Are you sure you want to cancel this appointment?"
        open={confirmCancelOpen}
        handleCancel={dismissConfirmation}
        handleConfirm={submitConfirmation}
        confirmButtonText="Yes"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
