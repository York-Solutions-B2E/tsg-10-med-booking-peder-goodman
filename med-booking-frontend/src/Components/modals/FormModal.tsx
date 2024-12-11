import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { CreateAppointmentForm } from "../forms/CreateAppointmentForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FormModal(props: any) {
  const { open, onSubmit, onCancel } = props;

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onCancel}
        TransitionComponent={Transition}
      >
        <CreateAppointmentForm onSubmit={onSubmit} onCancel={onCancel} />
      </Dialog>
    </>
  );
}
