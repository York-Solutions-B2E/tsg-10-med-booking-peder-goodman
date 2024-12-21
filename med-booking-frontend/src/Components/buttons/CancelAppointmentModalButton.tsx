import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cancelAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  
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
    store.dispatch(getPatientDetails(patientDetails.id as number));
  };

  return (
    <>
      <GridActionsCellItem
        disabled={isButtonDisabled}
        icon={
          <Tooltip title="Cancel Appointment">
            <DoNotDisturbIcon />
          </Tooltip>
        }
        label="Cancel"
        className="textPrimary"
        onClick={handleClickButton}
        color="error"
      />
      <GenericConfirmActionModal
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
