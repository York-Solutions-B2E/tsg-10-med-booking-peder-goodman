import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { AddAppointmentForm } from "../forms/AddAppointmentForm";
import { ConfirmationAppointmentModal } from "../modals/ConfirmationAppointmentModal";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { FullScreenFormModalWrapper } from "../modals/FullScreenFormModalWrapper";

export default function AddAppointmentModalButton() {
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

  // ? this is hard to test in this component because it depends on another component for form validations etc
  // ? what I would do in the future (or in a soon to be refactored code) is to move this form submission 
  // ? modal and logic to the form component itself. This way, I can test the form submission logic in isolation
  // ? along with the form validations etc.
  // ? I would also move FormModalWrapper into this component and pass the form component as a child
  // ? this way, the form modal wrapper is only used in this component, since it is only used to open/close the form
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
        <AddAppointmentForm />
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
