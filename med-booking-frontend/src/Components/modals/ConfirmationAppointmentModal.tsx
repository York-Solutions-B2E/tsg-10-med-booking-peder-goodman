import { DialogContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";

interface ConfirmationAppointmentModalProps {
  color: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  open: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  appointment: AppointmentRequest;
  confirmButtonText: string;
}

export function ConfirmationAppointmentModal(props: ConfirmationAppointmentModalProps) {
  const { color, open, handleCancel, handleConfirm, appointment, confirmButtonText } = props;

  if (!appointment) {
    return null;
  }
  const patient = appointment.patient;
  const doctor = appointment.doctor;
  const appointmentDate = dayjs(appointment.appointmentDate).format("MMM DD, YYYY");
  const appointmentTime = dayjs(appointment.appointmentDate + appointment.appointmentTime).format("hh:mm a");
  const visitType = appointment.visitType;

  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color={color} onClick={handleConfirm} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
