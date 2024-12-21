import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { deleteDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

const CancelAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;

  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleClickButton = () => {
    setConfirmCancelOpen(true);
  };

  // * Confirmation Modal handlers
  const dismissConfirmation = () => {
    setConfirmCancelOpen(false);
  };

  const submitConfirmation = async () => {
    setConfirmCancelOpen(false);
    // Delete the doctor and refresh the doctor list
    await store.dispatch(deleteDoctor(doctor.id));
    store.dispatch(getSpecializationsAndDoctors());
  };

  return (
    <>
      <GridActionsCellItem
        icon={
          <Tooltip title="Delete Forever">
            <DeleteForeverIcon />
          </Tooltip>
        }
        label="Cancel"
        className="textPrimary"
        onClick={handleClickButton}
        color="error"
      />
      <GenericConfirmActionModal
        color="error"
        message="Deleting a doctor is irreversible, are you sure?"
        open={confirmCancelOpen}
        handleCancel={dismissConfirmation}
        handleConfirm={submitConfirmation}
        confirmButtonText="Delete"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
