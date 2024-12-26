import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { activateDoctor, deactivateDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { ButtonIconWithToolTip } from "../buttons/ButtonIconWithToolTip";
import { DoctorForm } from "../forms/DoctorForm";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";
import { FormModal } from "../modals/FormModal";
import { useCustomModal } from "../modals/useCustomModal";

// ******** FUNCTION START
export default function DoctorDataGrid() {
  const availableDoctors = useSelector((state: RootState) => state.medicalOptions.availableDoctors);
  const [isConfirmDeactivateOpen, openConfirmDeactivate, closeConfirmDeactivate] = useCustomModal();
  const [isConfirmActivateOpen, openConfirmActivate, closeConfirmActivate] = useCustomModal();
  const [isEditDoctorFormOpen, openEditDoctorFormModal, closeEditDoctorFormModal] = useCustomModal();
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorDetails | undefined>(undefined);

  // * click handlers
  const handleClickEdit = async (doctor: DoctorDetails) => {
    console.log("clicked edit doctor");
    console.log("selected doctor: ", doctor);

    await setSelectedDoctor(doctor);
    openEditDoctorFormModal();
  };

  const handleClickDeactivate = (doctor: DoctorDetails) => {
    setSelectedDoctor(doctor);
    openConfirmDeactivate();
  };

  const handleConfirmDeactivateDoctor = async () => {
    if (!selectedDoctor) {
      console.error("selectedDoctor is undefined");
      return;
    }

    // Deactivate the doctor and refresh the doctor list
    await store.dispatch(deactivateDoctor(selectedDoctor.id));
    store.dispatch(getSpecializationsAndDoctors());

    closeConfirmDeactivate();
    setSelectedDoctor(undefined);
  };

  const handleClickActivateDoctor = async (doctor: DoctorDetails) => {
    setSelectedDoctor(doctor);
    openConfirmActivate();
  };

  const handleConfirmActivateDoctor = async () => {
    if (!selectedDoctor) {
      console.error("selectedDoctor is undefined");
      return;
    }

    // Activate the doctor and refresh the doctor list
    await store.dispatch(activateDoctor(selectedDoctor.id));
    store.dispatch(getSpecializationsAndDoctors());

    closeConfirmActivate();
    setSelectedDoctor(undefined);
  };

  // ******** Columns headers and data
  const columns: GridColDef[] = [
    {
      field: "id",
      // flex: 1,
      headerName: "Id",
      type: "number",
      width: 30,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "firstName",
      flex: 1,
      headerName: "First Name",
      width: 100,
      renderCell: (params: { row: DoctorAvailability }) => {
        return "Dr. " + params.row.firstName;
      },
    },
    {
      field: "lastName",
      flex: 1,
      headerName: "Last Name",
      width: 100,
    },
    {
      flex: 1,
      field: "specialization",
      headerName: "Specialization",
      width: 130,
      renderCell: (params: { row: DoctorAvailability }) => {
        return params.row.specialization.name;
      },
    },
    {
      flex: 1,
      field: "doctorStatus",
      headerName: "Status",
      width: 130,
      renderCell: (params: { row: DoctorAvailability }) => {
        return params.row.doctorStatus;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params: GridRowParams) => {
        const doctor = params.row as DoctorDetails;
        if (doctor.doctorStatus === "INACTIVE") {
          return [
            <ButtonIconWithToolTip
              onClick={() => {
                handleClickActivateDoctor(doctor);
              }}
              icon={<PersonAddAlt1Icon />}
              tooltip="re-activate Doctor"
            />,
          ];
        } else {
          return [
            <ButtonIconWithToolTip
              onClick={() => {
                handleClickEdit(doctor);
              }}
              icon={<EditIcon />}
            />,
            <ButtonIconWithToolTip
              color="error"
              tooltip="Delete Doctor"
              onClick={() => {
                handleClickDeactivate(doctor);
              }}
              icon={<DeleteForeverIcon />}
            />,
          ];
        }
      },
    },
  ];
  // END ******** Columns headers and data

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={availableDoctors}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15, 30]}
        disableRowSelectionOnClick
        // slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
      <FormModal open={isEditDoctorFormOpen} onClose={closeEditDoctorFormModal} maxWidth={"sm"} FormComponent={DoctorForm} isEditing={true} formData={selectedDoctor} />
      <ConfirmActionModal
        color="error"
        message="All of this doctor's appointments will be cancelled. Confirm?"
        open={isConfirmDeactivateOpen}
        onDismiss={closeConfirmDeactivate}
        onConfirmAction={handleConfirmDeactivateDoctor}
        confirmButtonText="Deactivate"
      />
      <ConfirmActionModal
        color="primary"
        message="Confirm re-activate doctor?"
        open={isConfirmActivateOpen}
        onDismiss={closeConfirmActivate}
        onConfirmAction={handleConfirmActivateDoctor}
        confirmButtonText="Activate"
      />
    </Box>
  );
}
