import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cancelAppointment } from "../../store/actions/appointmentActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { store } from "../../store/store";
import { calculateAge, checkIfAppointmentIsEditable } from "../../utils/helperFunctions";
import { useCustomModal } from "../../utils/useCustomModal";
import { ButtonIconWithToolTip } from "../buttons/ButtonIconWithToolTip";
import { AppointmentForm } from "../forms/AppointmentForm";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";
import { FormModal } from "../modals/FormModal";

// ******** FUNCTION START
export default function AppointmentDataGrid() {
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const { patientAppointments } = patientDetails;

  const [isConfirmCancelAppointmentOpen, openConfirmCancelAppointment, closeConfirmCancelAppointment] = useCustomModal();
  const [isEditAppointmentFormOpen, openEditAppointmentFormModal, closeEditAppointmentFormModal] = useCustomModal();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);

  // * click handlers
  const handleClickEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    openEditAppointmentFormModal();
  };

  const handleClickCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    openConfirmCancelAppointment();
  };

  const handleConfirmCancelAppointment = async () => {
    if (!selectedAppointment) {
      console.error("selectedAppointment is undefined");
      return;
    }

    // Cancel the appointment and refresh the patient details
    await store.dispatch(cancelAppointment(selectedAppointment.id));
    store.dispatch(getPatientDetails(selectedAppointment.patient.id as number));

    closeConfirmCancelAppointment();
    setSelectedAppointment(undefined);
  };

  // ******** Columns headers and data
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "number",
      width: 60,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fullName",
      headerName: "Patient Name",
      width: 130,
      renderCell: (params: { row: Appointment }) => {
        return params.row.patient.fullName;
      },
    },
    {
      field: "birthdate",
      headerName: "Date of Birth",
      type: "string",
      width: 130,
      renderCell: (params: { row: Appointment }) => {
        return dayjs(params.row.patient.birthdate).format("MMM D, YYYY");
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 60,
      align: "left",
      headerAlign: "left",
      renderCell: (params: { row: Appointment }) => {
        return calculateAge(params.row.patient.birthdate);
      },
    },
    {
      field: "doctor",
      headerName: "Doctor",
      width: 170,
      renderCell: (params: { row: Appointment }) => {
        return "Dr. " + params.row.doctor.firstName + " " + params.row.doctor.lastName;
      },
    },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 130,
      renderCell: (params: { row: Appointment }) => {
        return params.row.doctor.specialization.name;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Apt Date",
      type: "string",
      width: 100,
      renderCell: (params: { row: Appointment }) => {
        const date = params.row.appointmentDate;
        const time = params.row.appointmentTime;
        const appointmentDateTime = dayjs(date + time);
        return (
          <Box>
            <Typography sx={{ fontSize: 14 }}> {appointmentDateTime.format("MMM D, YY")}</Typography>
            <Typography sx={{ fontSize: 16 }}>{appointmentDateTime.format("h:mma")}</Typography>
          </Box>
        );
      },
    },
    {
      field: "appointmentStatus",
      headerName: "Status",
      type: "string",
      width: 120,
      renderCell: (params: { row: Appointment }) => {
        const status = params.row.appointmentStatus;
        const appointmentDateTime = dayjs(params.row.appointmentDate + params.row.appointmentTime);
        const currentDateTime = dayjs();

        // if it's not canceled and the appointment date is in the past, then it's completed
        if (status !== "CANCELED" && currentDateTime.isAfter(appointmentDateTime)) {
          return "COMPLETED";
        }

        return params.row.appointmentStatus;
      },
    },
    {
      field: "visitType",
      headerName: "Visit Type",
      type: "string",
      width: 120,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: GridRowParams) => {
        const appointment = params.row as Appointment;
        const isAppointmentEditable = checkIfAppointmentIsEditable(appointment);

        return [
          <ButtonIconWithToolTip
            disabled={!isAppointmentEditable}
            onClick={() => {
              handleClickEdit(appointment);
            }}
            icon={<EditIcon />}
            tooltip="Edit Appointment"
          />,
          <ButtonIconWithToolTip
            disabled={!isAppointmentEditable}
            color="error"
            tooltip="Cancel Appointment"
            onClick={() => {
              handleClickCancelAppointment(appointment);
            }}
            icon={<DoNotDisturbIcon />}
          />,
        ];
      },
    },
  ];
  // END ******** Columns headers and data

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={patientAppointments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
      <FormModal
        open={isEditAppointmentFormOpen}
        onClose={closeEditAppointmentFormModal}
        maxWidth={"sm"}
        FormComponent={AppointmentForm}
        isEditing={true}
        formData={selectedAppointment}
      />

      <ConfirmActionModal
        color="error"
        message="Are you sure you want to cancel this appointment?"
        open={isConfirmCancelAppointmentOpen}
        onDismiss={closeConfirmCancelAppointment}
        onConfirmAction={handleConfirmCancelAppointment}
        confirmButtonText="Yes"
      />
    </Box>
  );
}
