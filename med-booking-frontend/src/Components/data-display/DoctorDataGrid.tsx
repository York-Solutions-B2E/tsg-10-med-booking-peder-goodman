import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteDoctorModalButton from "../buttons/DeleteDoctorModalButton";
import EditDoctorModalButton from "../buttons/EditDoctorModalButton";

// ******** Columns headers and data
const columns: GridColDef[] = [
  {
    field: "id",
    flex: 1,
    headerName: "Id",
    type: "number",
    width: 60,
    align: "left",
    headerAlign: "left",
    editable: false,
  },
  {
    field: "firstName",
    flex: 1,
    headerName: "First Name",
    width: 100,
    editable: false,
    renderCell: (params: { row: DoctorAvailability }) => {
      return "Dr. " + params.row.firstName;
    },
  },
  {
    field: "lastName",
    flex: 1,
    headerName: "Last Name",
    width: 100,
    editable: false,
  },
  {
    flex: 1,
    field: "specialization",
    headerName: "Specialization",
    width: 130,
    editable: true,
    // type: "singleSelect",
    renderCell: (params: { row: DoctorAvailability }) => {
      return params.row.specialization.name;
    },
  },
  {
    flex: 1,
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: (params: GridRowParams) => {
      const doctor = params.row as DoctorDetails;
      return [
        <EditDoctorModalButton doctor={doctor} />,
        <DeleteDoctorModalButton doctor={doctor} />,
      ];
    },
  },
];
// END ******** Columns headers and data

// ******** FUNCTION START
export default function DoctorDataGrid() {
  const availableDoctors = useSelector(
    (state: RootState) => state.medicalOptions.availableDoctors
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={availableDoctors}
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
