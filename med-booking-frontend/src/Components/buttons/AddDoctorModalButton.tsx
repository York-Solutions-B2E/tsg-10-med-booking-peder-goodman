import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { AddDoctorForm } from "../forms/AddDoctorForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";

export default function AddDoctorModalButton() {
  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [addDoctorFormData, setAddDoctorFormData] = useState<DoctorRequest | null>(null);

  // * Form Modal handlers
  const handleOpenAppointmentFormModal = () => {
    setOpenForm(true);
  };

  const handleCancelSubmission = () => {
    setConfirmCancelOpen(true);
  };

  const handleSubmission = (data: any) => {
    setAddDoctorFormData(data);
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

  const handleConfirmSubmit = async () => {
    setConfirmSubmitOpen(false);
    setOpenForm(false);
    console.log("Add Doctor Form Data Submitted:", addDoctorFormData);
    await store.dispatch(createDoctor(addDoctorFormData as DoctorRequest));
    store.dispatch(getSpecializationsAndDoctors());
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAppointmentFormModal}>
        Add New Doctor
      </Button>
      {/* Testing modal sizes. will be fullscreen modal*/}

      <LargeFormModalWrapper open={openForm} onCancel={handleCancelSubmission} onSubmit={handleSubmission}>
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
