import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cancelAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { ConfirmationModal } from "../modals/ConfirmationModal";

const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelClickButton = () => {
    setConfirmCancelOpen(true);
  };

  // * Confirmation Modal handlers
  const dismissConfirmation = () => {
    setConfirmCancelOpen(false);
  };

  const submitConfirmation = async () => {
    setConfirmCancelOpen(false);
    // Cancel the appointment and refresh the patient details
    await store.dispatch(cancelAppointment(appointment.id));
    store.dispatch(getPatientDetails(patientDetails.id as number));
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
