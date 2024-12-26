import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { deactivateDoctor, getSpecializationsAndDoctors } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";

const DeactivateDoctorModalButton = (props: DoctorModalButtonProps) => {
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
    // Deactivate the doctor and refresh the doctor list
    await store.dispatch(deactivateDoctor(doctor.id));
    store.dispatch(getSpecializationsAndDoctors());
  };

  const buttonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <>
      <IconButton sx={buttonStyle} color="error" onClick={handleClickButton}>
        <Tooltip title="Deactivate Doctor">
          <DeleteForeverIcon />
        </Tooltip>
      </IconButton>

      <ConfirmActionModal
        color="error"
        message="Deleting a doctor is irreversible, are you sure?"
        open={confirmCancelOpen}
        onDismiss={dismissConfirmation}
        onConfirmAction={submitConfirmation}
        confirmButtonText="Deactivate"
      />
    </>
  );
};

export default DeactivateDoctorModalButton;
