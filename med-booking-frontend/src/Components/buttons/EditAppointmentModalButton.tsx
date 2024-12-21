import EditIcon from "@mui/icons-material/Edit";
import { Dialog, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ModalTransition } from "../../utils/ModalTransition";
import { AppointmentForm } from "../forms/AppointmentForm";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

const EditAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState<AppointmentRequest | undefined>(undefined);

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
  const handleCancelSubmission = () => {
    setConfirmCancelOpen(true);
  };

  const handleCloseConfirmCancelModal = () => {
    setConfirmCancelOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelOpen(false);
    setOpenForm(false);
  };

  const handleOpenEditAppointmentForm = (appointment: Appointment) => {
    setAppointmentFormData(appointment);
    setOpenForm(true);
  };

  return (
    <>
      <GridActionsCellItem
        disabled={isButtonDisabled}
        icon={
          <Tooltip title="Edit Appointment">
            <EditIcon />
          </Tooltip>
        }
        label="Save"
        sx={{
          color: "primary.main",
        }}
        onClick={() => handleOpenEditAppointmentForm(appointment)}
      />
      <Dialog fullWidth maxWidth="sm" open={openForm} onClose={handleCancelSubmission} TransitionComponent={ModalTransition}>
        <AppointmentForm onCancel={handleCancelSubmission} editFormData={appointmentFormData} isEditing={true} closeModal={handleConfirmCancel} />
      </Dialog>

      <GenericConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={confirmCancelOpen}
        handleCancel={handleCloseConfirmCancelModal}
        handleConfirm={handleConfirmCancel}
        confirmButtonText="Yes"
      />
    </>
  );
};

export default EditAppointmentModalButton;
