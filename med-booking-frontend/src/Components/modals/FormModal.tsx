import { Dialog } from "@mui/material";
import { ModalTransition } from "../../utils/ModalTransition";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { useCustomModal } from "./useCustomModal";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  FormComponent: React.ComponentType<any>;
  isEditing?: boolean;
  formData?: Appointment | DoctorDetails;
}

export const FormModal = (props: FormModalProps) => {
  const { open, onClose, fullScreen = false, maxWidth = "sm", FormComponent, isEditing, formData } = props;

  const [isConfirmCancelOpen, openConfirmCancel, closeConfirmCancel] = useCustomModal();

  const confirmCancellation = () => {
    closeConfirmCancel();
    onClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth={fullScreen ? false : maxWidth} fullScreen={fullScreen} open={open} onClose={openConfirmCancel} TransitionComponent={ModalTransition}>
        <FormComponent isEditing={isEditing} formData={formData} onCancel={openConfirmCancel} closeModal={confirmCancellation} />
      </Dialog>

      <ConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={isConfirmCancelOpen}
        onDismiss={closeConfirmCancel}
        onConfirmAction={confirmCancellation}
        confirmButtonText="Yes"
      />
    </>
  );
};
