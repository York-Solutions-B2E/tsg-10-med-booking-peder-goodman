import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AddDoctorForm } from "../forms/AddDoctorForm";
import { CreateAppointmentForm } from "../forms/CreateAppointmentForm";
import { ConfirmationModal } from "./ConfirmationModal";
import { FullScreenFormModalWrapper } from "./FullScreenFormModalWrapper";
import { LargeFormModalWrapper } from "./LargeFormModalWrapper";

export default function CreateAppointmentModal() {
  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState(null);

  // * Form Modal handlers
  const handleOpenAppointmentFormModal = () => {
    setOpenForm(true);
  };

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
    console.log("Form Data Submitted:", appointmentFormData);
    // * Submit form data to backend
    // store.dispatch(createAppointment(appointmentFormData));
  };

  const fullScreen = true;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAppointmentFormModal}
      >
        Add Appointment
      </Button>
      {/* Testing modal sizes. will be fullscreen modal*/}
      {fullScreen ? (
        <FullScreenFormModalWrapper
          open={openForm}
          onCancel={handleCancelSubmission}
          onSubmit={handleSubmission}
        >
          <CreateAppointmentForm />
        </FullScreenFormModalWrapper>
      ) : (
        <LargeFormModalWrapper
          open={openForm}
          onSubmit={handleSubmission}
          onCancel={handleCancelSubmission}
        >
          <AddDoctorForm />
        </LargeFormModalWrapper>
      )}
      <ConfirmationModal
        message="Is everything you provided accurate?"
        open={confirmSubmitOpen}
        handleCancel={handleCloseConfirmSubmitModal}
        handleConfirm={handleConfirmSubmit}
        confirmButtonText="Submit"
      />
      <ConfirmationModal
        message="Are you sure you want to cancel?"
        open={confirmCancelOpen}
        handleCancel={handleCloseConfirmCancelModal}
        handleConfirm={handleConfirmCancel}
        confirmButtonText="Yes"
      />
    </div>
  );
}
