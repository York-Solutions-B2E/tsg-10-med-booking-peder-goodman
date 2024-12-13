import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { calculateAge } from "../../utils/helperFunctions";
import CancelAppointmentModalButton from "../buttons/CancelAppointmentModalButton";
import EditAppointmentModalButton from "../buttons/EditAppointmentModalButton";

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
          <Typography sx={{ fontSize: 16 }}>{appointmentDateTime.format("HH:mma")}</Typography>
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
      let status = params.row.appointmentStatus;
      let date = params.row.appointmentDate;
      let time = params.row.appointmentTime;

      if (status !== "CANCELED") {
        let today = dayjs();
        let appointmentDateTime = dayjs(date + " " + time);
        if (today.isAfter(appointmentDateTime)) {
          return "COMPLETED";
        }
      }

      if (status === "CANCELED") {
        return "CANCELED";
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
      return [<EditAppointmentModalButton appointment={appointment} />, <CancelAppointmentModalButton appointment={appointment} />];
    },
  },
];
// END ******** Columns headers and data

// ******** FUNCTION START
export default function PatientAppointmentDataGrid() {
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const { patientAppointments } = patientDetails;

  useEffect(() => {
    console.log("patientAppointments", patientAppointments);
  }, [patientAppointments]);

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
    </Box>
  );
}
