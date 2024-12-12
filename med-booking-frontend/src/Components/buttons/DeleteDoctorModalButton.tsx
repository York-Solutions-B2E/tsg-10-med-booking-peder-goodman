import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CancelAppointmentModalButton = (props: DoctorModalButtonProps) => {
  const { doctor } = props;
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelClick = () => {
    console.log("clicked cancel id", doctor.id);
    // console.log("clicked cancel doctor", doctor);
    // console.log("clicked cancel specialization", doctor.specialization.name);
    setConfirmCancelOpen(true);
  };

  // * Confirmation Modal handlers
  const handleCloseConfirmCancelModal = () => {
    setConfirmCancelOpen(false);
  };

  const handleConfirmCancel = () => {
    setConfirmCancelOpen(false);
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
        onClick={handleCancelClick}
        color="error"
      />
      <ConfirmationModal
        color="error"
        message="Deleting a doctor is irreversible, are you sure?"
        open={confirmCancelOpen}
        handleCancel={handleCloseConfirmCancelModal}
        handleConfirm={handleConfirmCancel}
        confirmButtonText="Delete"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
