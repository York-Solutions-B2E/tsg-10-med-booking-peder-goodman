import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { deleteDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";

const CancelAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelClickButton = () => {
    setConfirmCancelOpen(true);
  };

  // * Confirmation Modal handlers
  const dismissConfirmation = () => {
    setConfirmCancelOpen(false);
  };

  const submitConfirmation = async () => {
    setConfirmCancelOpen(false);
    console.log("Doctor deleted:", doctor.id);
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
        onClick={handleCancelClickButton}
        color="error"
      />
      <ConfirmationModal
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
