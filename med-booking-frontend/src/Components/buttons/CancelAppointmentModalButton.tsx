import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { cancelAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";

const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;
  // const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);

  let userId = appointment.patient.id;

  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isAppointmentDateInThePast = dayjs(appointment.appointmentDate + appointment.appointmentTime).isBefore(dayjs());

    if (isAppointmentDateInThePast) {
      setIsButtonDisabled(true);
    }

    if (appointment.appointmentStatus === "CANCELED") {
      setIsButtonDisabled(true);
    }
  }, []);

  const handleClickButton = () => {
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
    store.dispatch(getPatientDetails(appointment.patient.id as number));
  };

  const buttonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <>
      <IconButton disabled={isButtonDisabled} sx={buttonStyle} color="error" onClick={handleClickButton}>
        <Tooltip title="Cancel Appointment">
          <DoNotDisturbIcon />
        </Tooltip>
      </IconButton>

      <ConfirmActionModal
        color="error"
        message="Are you sure you want to cancel this appointment?"
        open={confirmCancelOpen}
        onDismiss={dismissConfirmation}
        onConfirmAction={submitConfirmation}
        confirmButtonText="Yes"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
