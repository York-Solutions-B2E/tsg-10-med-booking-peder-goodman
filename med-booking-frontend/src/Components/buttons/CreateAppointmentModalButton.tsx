import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { CreateAppointmentForm } from "../forms/CreateAppointmentForm";
import { ConfirmationAppointmentModal } from "../modals/ConfirmationAppointmentModal";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { FullScreenFormModalWrapper } from "../modals/FullScreenFormModalWrapper";

export default function CreateAppointmentModalButton() {
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState<AppointmentRequest | null>(null);

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

  const handleConfirmSubmit = async () => {
    console.log("Submitting appointment form data");
    setConfirmSubmitOpen(false);
    setOpenForm(false);
    await store.dispatch(createAppointment(appointmentFormData as AppointmentRequest));
    store.dispatch(getPatientDetails(patientDetails.id as number));
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAppointmentFormModal}>
        Add Appointment
      </Button>
      {/* Testing modal sizes. will be fullscreen modal*/}

      <FullScreenFormModalWrapper open={openForm} onCancel={handleCancelSubmission} onSubmit={handleSubmission}>
        <CreateAppointmentForm />
      </FullScreenFormModalWrapper>

      <ConfirmationAppointmentModal
        appointment={appointmentFormData as AppointmentRequest}
        color="success"
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
