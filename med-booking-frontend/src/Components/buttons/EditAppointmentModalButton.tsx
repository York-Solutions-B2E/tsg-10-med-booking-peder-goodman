import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

const EditAppointmentModalButton = (props: AppointmentModalButtonProps) => {
  const { appointment } = props;

  const handleEditClick = (appointment: Appointment) => {
    console.log("clicked edit id", appointment.id);
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
          <Tooltip title="Edit Appointment">
            <EditIcon />
          </Tooltip>
        }
        label="Save"
        sx={{
          color: "primary.main",
        }}
        onClick={() => handleEditClick(appointment)}
      />
    </>
  );
};

export default EditAppointmentModalButton;
