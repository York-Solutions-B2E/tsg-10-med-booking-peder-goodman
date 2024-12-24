import { Dialog } from "@mui/material";
import { ModalTransition } from "../../utils/ModalTransition";
import { GenericConfirmActionModal } from "./GenericConfirmActionModal";
import { useCustomModal } from "./useCustomModal";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  FormComponent: React.ComponentType<any>;
  formProps?: {
    isEditing: boolean;
    data: Appointment | DoctorDetails;
  };
}

export const FormModal = (props: FormModalProps) => {
  const { open, onClose, fullScreen = false, FormComponent, formProps } = props;

  const [isConfirmCancelOpen, openConfirmCancel, closeConfirmCancel] = useCustomModal();

  const confirmCancellation = () => {
    closeConfirmCancel();
    onClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth={fullScreen ? false : "sm"} fullScreen={fullScreen} open={open} onClose={openConfirmCancel} TransitionComponent={ModalTransition}>
        <FormComponent {...formProps} onCancel={openConfirmCancel} closeModal={confirmCancellation} />
      </Dialog>

      <GenericConfirmActionModal
        color="error"
        message="Are you sure you want to cancel?"
        open={isConfirmCancelOpen}
        handleCancel={closeConfirmCancel}
        handleConfirm={confirmCancellation}
        confirmButtonText="Yes"
      />
    </>
  );
};
