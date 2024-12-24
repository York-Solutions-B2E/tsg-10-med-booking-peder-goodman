import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { deleteDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { GenericConfirmActionModal } from "../modals/GenericConfirmActionModal";

const DeleteDoctorModalButton = (props: DoctorModalButtonProps) => {
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

  const buttonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <>
      <IconButton sx={buttonStyle} color="error" onClick={handleClickButton}>
        <Tooltip title="Delete Forever">
          <DeleteForeverIcon />
        </Tooltip>
      </IconButton>
      
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

export default DeleteDoctorModalButton;
