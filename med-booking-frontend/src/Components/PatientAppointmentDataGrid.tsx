import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useSelector } from "react-redux";
import { calculateAge } from "../utils/validationFunctions";





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
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: (params: GridRowParams) => {
      const appointment = params.row as Appointment;
      return [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit Appointment">
              <EditIcon />
            </Tooltip>
          }
          label="Save"
          sx={{
            color: "primary.main",
          }}
          onClick={() => handleEditClick(appointment)}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Cancel Appointment">
              <DoNotDisturbIcon />
            </Tooltip>
          }
          label="Cancel"
          className="textPrimary"
          onClick={() => handleCancelClick(appointment)}
          color="error"
        />,
      ];
    },
  },
];


const handleEditClick = (appointment: Appointment) => {
  console.log("clicked edit id", appointment.id);
  console.log("clicked cancel patient", appointment.patient.fullName);
  console.log("clicked cancel doctor", appointment.doctor.firstName);
  console.log("clicked cancel specialization", appointment.doctor.specialization.name);
};
const handleCancelClick = (appointment: Appointment) => {
  console.log("clicked cancel id", appointment.id);
  console.log("clicked cancel patient", appointment.patient.fullName);
  console.log("clicked cancel doctor", appointment.doctor.firstName);
  console.log("clicked cancel specialization", appointment.doctor.specialization.name);
};

export default function CustomDataGrid() {
  const patientDetails = useSelector(
    (state: RootState) => state.user.userDetails as PatientDetails
  );
  const {
    id,
    firstName,
    lastName,
    email,
    role,
    birthdate,
    patientAppointments,
  } = patientDetails;

  console.log("patientAppointments", patientAppointments);
  

  const [rows, setRows] = React.useState(patientAppointments);

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
