import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
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
    // flex: 1,
    width: 60,
    // minWidth: 60,
    align: "left",
    headerAlign: "left",
    editable: false,
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    width: 120,
    editable: false,
    renderCell: (params: { row: Appointment }) => {
      return params.row.patient.firstName;
    },
  },
  {
    field: "LastName",
    headerName: "Last Name",
    flex: 1,
    width: 120,
    editable: false,
    renderCell: (params: { row: Appointment }) => {
      return params.row.patient.lastName;
    },
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 70,
    align: "left",
    headerAlign: "left",
    editable: false,
    renderCell: (params: { row: Appointment }) => {
      return calculateAge(params.row.patient.birthdate);
    },
  },
  {
    field: "birthdate",
    headerName: "Date of Birth",
    type: "string",
    width: 140,
    editable: false,
    renderCell: (params: { row: Appointment }) => {
      return dayjs(params.row.patient.birthdate).format("MMM D, YYYY");
    },
  },
  {
    field: "doctor",
    flex: 1,
    headerName: "Doctor",
    width: 200,
    editable: true,
    renderCell: (params: { row: Appointment }) => {
      return (
        "Dr. " + params.row.doctor.firstName + " " + params.row.doctor.lastName
      );
    },
  },
  {
    field: "specialization",
    headerName: "Specialization",
    width: 160,
    editable: true,
    // type: "singleSelect",
    renderCell: (params: { row: Appointment }) => {
      return params.row.doctor.specialization.name;
    },
  },
  {
    field: "appointmentDate",
    headerName: "Appointment Date",
    type: "string",
    width: 140,
    editable: true,
  },
  {
    field: "visitType",
    headerName: "Visit Type",
    type: "string",
    width: 100,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: (params: GridRowParams) => {
      const appointment = params.row as Appointment;
      return [
        <EditAppointmentModalButton appointment={appointment} />,
        <CancelAppointmentModalButton appointment={appointment} />,
      ];
    },
  },
];
// END ******** Columns headers and data

// ******** FUNCTION START
export default function PatientAppointmentDataGrid() {
  const patientDetails = useSelector(
    (state: RootState) => state.user.userDetails as PatientDetails
  );
  const { patientAppointments } = patientDetails;

  console.log("patientAppointments", patientAppointments);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={patientAppointments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </Box>
  );
}
