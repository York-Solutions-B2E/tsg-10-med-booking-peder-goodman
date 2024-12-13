import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { getSpecializationsAndDoctors, updateDoctor } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { AddDoctorForm } from "../forms/AddDoctorForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";

const EditAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [editDoctorFormData, setEditDoctorFormData] = useState<DoctorRequest | null>(null);

  // * Form Modal handlers
  const handleCancelSubmission = () => {
    setConfirmCancelOpen(true);
  };

  const handleSubmission = (data: any) => {
    setEditDoctorFormData(data);
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

    const doctorToUpdate: DoctorRequest = {
      id: doctor.id,
      firstName: editDoctorFormData?.firstName || "",
      lastName: editDoctorFormData?.lastName || "",
      specialization: editDoctorFormData?.specialization || { id: 0, name: "" },
    };

    await store.dispatch(updateDoctor(doctorToUpdate as DoctorRequest));

    // TODO: If error, show error message here

    // Refresh the doctor list
    store.dispatch(getSpecializationsAndDoctors());
  };

  const handleOpenEditDoctorForm = (doctor: DoctorDetails) => {

    setEditDoctorFormData(doctor);
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

      <LargeFormModalWrapper open={openForm} onSubmit={handleSubmission} onCancel={handleCancelSubmission}>
        <AddDoctorForm formData={doctor} isEditing={true} />
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
