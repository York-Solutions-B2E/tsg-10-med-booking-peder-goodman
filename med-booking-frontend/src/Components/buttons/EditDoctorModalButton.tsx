import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { AddDoctorForm } from "../forms/AddDoctorForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";

const EditAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [editDoctorFormData, setAppointmentFormData] = useState(null);

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
    console.log("Doctor Form Data Submitted:", editDoctorFormData);
    // TODO Submit edit doctor form data to backend
    // store.dispatch(updateDoctor(editDoctorFormData));
  };

  const handleOpenEditDoctorForm = (doctor: DoctorDetails) => {
    console.log("clicked cancel id", doctor.id);
    // TODO: Set initial form data
    setOpenForm(true);
  };

  return (
    <>
      <GridActionsCellItem
        icon={
          <Tooltip title="Edit Doctor">
            <EditIcon />
          </Tooltip>
        }
        label="Save"
        sx={{
          color: "primary.main",
        }}
        onClick={() => handleOpenEditDoctorForm(doctor)}
      />

      <LargeFormModalWrapper
        open={openForm}
        onSubmit={handleSubmission}
        onCancel={handleCancelSubmission}
      >
        <AddDoctorForm />
      </LargeFormModalWrapper>

      <ConfirmationModal
        color="success"
        message="Are you sure?"
        open={confirmSubmitOpen}
        handleCancel={handleCloseConfirmSubmitModal}
        handleConfirm={handleConfirmSubmit}
        confirmButtonText="Update Doctor"
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
