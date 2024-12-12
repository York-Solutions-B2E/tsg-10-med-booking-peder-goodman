import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { CreateAppointmentForm } from "../forms/CreateAppointmentForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { FullScreenFormModalWrapper } from "../modals/FullScreenFormModalWrapper";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";
import { AddDoctorForm } from "../forms/AddDoctorForm";

export default function AddDoctorModalButton() {
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
    console.log("Appointment Form Data Submitted:", appointmentFormData);
    // * Submit appointment form data to backend
    // store.dispatch(createAppointment(appointmentFormData));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAppointmentFormModal}
      >
        Add New Doctor
      </Button>
      {/* Testing modal sizes. will be fullscreen modal*/}

      <LargeFormModalWrapper
        open={openForm}
        onCancel={handleCancelSubmission}
        onSubmit={handleSubmission}
      >
        <AddDoctorForm />
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
    </div>
  );
}
