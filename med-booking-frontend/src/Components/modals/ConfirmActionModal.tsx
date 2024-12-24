import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmActionModalProps {
  color: "primary" | "secondary" | "error" | "success";
  message: string;
  open: boolean;
  onDismiss: () => void;
  onConfirmAction: () => void;
  confirmButtonText: string;
}

export function ConfirmActionModal(props: ConfirmActionModalProps) {
  const { color, message, open, onDismiss, onConfirmAction, confirmButtonText } = props;

  // * Keyboard event handlers
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     onConfirmAction();
  //   }
  // };

  return (
    <>
      <Dialog open={open} onClose={onDismiss}>
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button onClick={onDismiss}>Cancel</Button>
          <Button variant="contained" color={color} onClick={onConfirmAction} autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
