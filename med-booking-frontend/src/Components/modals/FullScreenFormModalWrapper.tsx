import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { cloneElement, forwardRef, ReactElement, Ref } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenFormModalWrapper(props: GenericModalProps) {
  const { open, onCancel, onSubmit, children } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
    >
      {/* Clone Element and pass props along  */}
      {cloneElement(children as ReactElement, { open, onCancel, onSubmit })}
    </Dialog>
  );
}
