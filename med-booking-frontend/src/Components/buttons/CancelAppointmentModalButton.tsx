import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useSelector } from "react-redux";
import { calculateAge } from "../../utils/helperFunctions";
import EditAppointmentModalButton from "../buttons/EditAppointmentModalButton";




const CancelAppointmentModalButton = (props: AppointmentModalButtonProps) => {
const { appointment } = props;

  const handleCancelClick = (appointment: Appointment) => {
    console.log("clicked cancel id", appointment.id);
    console.log("clicked cancel patient", appointment.patient.fullName);
    console.log("clicked cancel doctor", appointment.doctor.firstName);
    console.log(
      "clicked cancel specialization",
      appointment.doctor.specialization.name
    );
  };

  return (
    <>
      <GridActionsCellItem
        icon={
          <Tooltip title="Cancel Appointment">
            <DoNotDisturbIcon />
          </Tooltip>
        }
        label="Cancel"
        className="textPrimary"
        onClick={() => handleCancelClick(appointment)}
        color="error"
      />
    </>
  );
};

export default CancelAppointmentModalButton;
