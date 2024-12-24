import { DialogContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";

export function AppointmentConfirmationModal(props: ConfirmationAppointmentModalProps) {
  const { color, open, onDismiss, onConfirmAction, appointment, confirmButtonText } = props;

  if (!appointment) {
    return null;
  }
  const patient = appointment.patient;
  const doctor = appointment.doctor;
  const appointmentDate = dayjs(appointment.appointmentDate).format("MMM DD, YYYY");
  const appointmentTime = dayjs(appointment.appointmentDate + appointment.appointmentTime).format("hh:mm a");
  const visitType = appointment.visitType;

  // * Keyboard event handlers
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     onConfirmAction();
  //   }
  // };

  return (
    <>
      <Dialog open={open} onClose={onDismiss}>
        <DialogTitle id="alert-dialog-title">Confirm These Details</DialogTitle>
        <DialogContent>
          <Typography variant="h4" component="div">
            Patient Details
          </Typography>
          <Typography>{`Patient: ${patient?.fullName}`}</Typography>
          <Typography>{`Patient Email: ${patient?.email}`}</Typography>
          <Typography>{`Birthdate: ${dayjs(patient?.birthdate).format("MMM DD, YYYY")}`}</Typography>
          <Typography variant="h4" component="div">
            Appointment Details
          </Typography>
          <Typography>{`Doctor Name: Dr. ${doctor.firstName} ${doctor.lastName}`}</Typography>
          <Typography>{`Appt Date: ${appointmentDate}`}</Typography>
          <Typography>{`Appt Time: ${appointmentTime}`}</Typography>
          <Typography>{`Visit Type: ${visitType}`}</Typography>
          {visitType == "IN_PERSON" && <Typography>{`Please Arrive 15 minutes before your appointment starts`}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDismiss}>Cancel</Button>
          <Button variant="contained" color={color} onClick={onConfirmAction} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
