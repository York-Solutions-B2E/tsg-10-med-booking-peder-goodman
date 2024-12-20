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

// ? this component adds a lot of complexity for doing a little 
// ? I think it's easier to just use the Dialog component directly in the parent component
// ? this way, the parent component can have more control over the modal
// ? and it's easier to understand what's going on
// ? then the parent component can manage opening/closing the form modal
// ? and then the form component can manage the form submission
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
