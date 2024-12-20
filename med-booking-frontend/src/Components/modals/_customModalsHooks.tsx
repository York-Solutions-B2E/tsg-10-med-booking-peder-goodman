export {}


// to setup the hook
import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // this allows you to use destructuring when calling the hook (see below)
  return [isOpen, openModal, closeModal] as const;
}

// To use the hook, you can do the following:

// import { useModal } from './useModal';
import { AddAppointmentForm } from '../forms/AddAppointmentForm';
import { ConfirmationModal } from './ConfirmationModal';
import { Dialog } from '@mui/material';

export default function AddAppointmentModalButton() {
  const [isFormOpen, openFormModal, closeFormModal] = useModal();
  const [isCancelModalOpen, openCancelModal, closeCancelModal] = useModal();
  const [isSubmitModalOpen, openSubmitModal, closeSubmitModal] = useModal();

  const handleFormSubmit = (data: any) => {
    // Handle form submission logic
    openSubmitModal();
  };

  return (
    <div>
      <button onClick={openFormModal}>Add Appointment</button>

      {isFormOpen && (
        <Dialog onClose={closeFormModal} open={isFormOpen}>
          <AddAppointmentForm onSubmit={handleFormSubmit} onCancel={openCancelModal} />
        </Dialog>
      )}

      {isCancelModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to cancel?"
          onConfirm={closeCancelModal}
          onCancel={closeCancelModal}
        />
      )}

      {isSubmitModalOpen && (
        <ConfirmationModal
          message="Confirm submission?"
          onConfirm={closeSubmitModal}
          onCancel={closeSubmitModal}
        />
      )}
    </div>
  );
}