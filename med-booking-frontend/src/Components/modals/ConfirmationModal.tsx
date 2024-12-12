import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { error } from "console";

export function ConfirmationModal(props: any) {
  const { color, message, open, handleCancel, handleConfirm, confirmButtonText } = props;

  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color={color} onClick={handleConfirm} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
