import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { useState } from "react";

const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelClick = () => {
    console.log("clicked cancel id", appointment.id);
    console.log("clicked cancel patient", appointment.patient.fullName);
    console.log("clicked cancel doctor", appointment.doctor.firstName);
    console.log(
      "clicked cancel specialization",
      appointment.doctor.specialization.name);
      setConfirmCancelOpen(true)
  };


  // * Confirmation Modal handlers
  const handleCloseConfirmCancelModal = () => {
    setConfirmCancelOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelOpen(false);
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
        onClick={handleCancelClick}
        color="error"
      />
      <ConfirmationModal
        color="error"
        message="Are you sure you want to cancel this appointment?"
        open={confirmCancelOpen}
        handleCancel={handleCloseConfirmCancelModal}
        handleConfirm={handleConfirmCancel}
        confirmButtonText="Yes"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
