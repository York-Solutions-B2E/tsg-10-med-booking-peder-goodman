import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { updateAppointment } from "../../store/actions/appointmentActions";
import { getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { AddAppointmentForm } from "../forms/AddAppointmentForm";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { LargeFormModalWrapper } from "../modals/LargeFormModalWrapper";
import { getPatientDetails } from "../../store/actions/userActions";

const EditAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;

  const [openForm, setOpenForm] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState<AppointmentRequest | null>(null);

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
    setConfirmSubmitOpen(false);
    setOpenForm(false);
    console.log("Appointment Form Data Submitted:", appointmentFormData);

    const updatedAppointment: AppointmentRequest = {
      id: appointment?.id,
      doctor: appointmentFormData?.doctor as DoctorDetails,
      patient: appointmentFormData?.patient as PatientDetails,
      appointmentDate: appointmentFormData?.appointmentDate as string,
      appointmentTime: appointmentFormData?.appointmentTime as string,
      visitType: appointmentFormData?.visitType as VisitType,
    };

    await store.dispatch(updateAppointment(updatedAppointment as Appointment));

    // TODO: If error, show error message here
    // Refresh the doctor list
    store.dispatch(getPatientDetails(appointmentFormData?.patient.id as number));
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

      <LargeFormModalWrapper open={openForm} onSubmit={handleSubmission} onCancel={handleCancelSubmission}>
        <AddAppointmentForm formData={appointmentFormData} isEditing={true} />
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
