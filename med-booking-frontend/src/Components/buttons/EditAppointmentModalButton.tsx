import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateAppointmentForm } from "../forms/CreateAppointmentForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";

const EditAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState(null);

  // * Form Modal handlers
  const handleCancelSubmission = () => {
    setConfirmCancelOpen(true);
  };

  const handleSubmission = (data: any) => {
    setAppointmentFormData(data);
    setConfirmSubmitOpen(true);
  };

  // * Confirmation Modal handlers
  const handleCloseConfirmSubmitModal = () => {
    setConfirmSubmitOpen(false);
  };

  const handleCloseConfirmCancelModal = () => {
    setConfirmCancelOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelOpen(false);
    setOpenForm(false);
  };

  const handleConfirmSubmit = () => {
    setConfirmSubmitOpen(false);
    setOpenForm(false);
    console.log("Appointment Form Data Submitted:", appointmentFormData);
    // TODO: Submit EDIT appointment form data to backend
    // store.dispatch(updateAppointment(appointmentFormData));
  };

  const handleOpenEditAppointmentForm = (appointment: Appointment) => {
    console.log("clicked edit id", appointment.id);
    // TODO: Set initial form data
    setOpenForm(true);
  };

  return (
    <>
      <GridActionsCellItem
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

      <LargeFormModalWrapper
        open={openForm}
        onSubmit={handleSubmission}
        onCancel={handleCancelSubmission}
      >
        {/* TODO replace with EditAppointmentForm */}
        <CreateAppointmentForm />
      </LargeFormModalWrapper>

      <ConfirmationModal
        color="success"
        message="Is everything you provided accurate?"
        open={confirmSubmitOpen}
        handleCancel={handleCloseConfirmSubmitModal}
        handleConfirm={handleConfirmSubmit}
        confirmButtonText="Submit"
      />
      <ConfirmationModal
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
