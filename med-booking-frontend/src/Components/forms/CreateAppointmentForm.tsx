import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { validateDateIsInPast } from "../../utils/validationFunctions";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

export const CreateAppointmentForm = (props: any) => {
  const { onSubmit, onCancel } = props; // ! change to correct function names
  const { userDetails } = useSelector((state: RootState) => state.user);

  // * Form state
  const [visitTypeSelection, setVisitTypeSelection] = useState("");
  const [visitTypeErrorMessage, setVisitTypeErrorMessage] = useState("");

  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [appointmentDateErrorMessage, setAppointmentDateErrorMessage] =
    useState("");

  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [appointmentTimeErrorMessage, setAppointmentTimeErrorMessage] =
    useState("");

  const [specialization, setSpecialization] = useState("");
  const [specializationErrorMessage, setSpecializationErrorMessage] =
    useState("");

  const [doctorSelection, setDoctorSelection] = useState("");
  const [doctorSelectionErrorMessage, setDoctorSelectionErrorMessage] =
    useState("");

  // * Event handlers
  const handleUpdateVisitTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisitTypeSelection(e.target.value);
    setVisitTypeErrorMessage("");
  };

  const handleAppointmentDateChange = (newValue: any) => {
    setAppointmentDate(newValue);
    setAppointmentDateErrorMessage("");
  };

  const handleAppointmentTimeChange = (newValue: any) => {
    setAppointmentTime(newValue);
    setAppointmentTimeErrorMessage("");
  };

  const handleUpdateSpecializationChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialization(e.target.value);
    setSpecializationErrorMessage("");
  };

  const handleUpdateDoctorSelectionChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDoctorSelection(e.target.value);
    setDoctorSelectionErrorMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // * Form validation
  const validateForm = () => {
    const isVisitTypeValid = visitTypeSelection.length > 0;
    const isAppointmentDateValid = !validateDateIsInPast(appointmentDate);
    const isAppointmentTimeValid = !validateDateIsInPast(appointmentDate);
    const isSpecializationValid = specialization.length > 0;
    const isDoctorValid = doctorSelection.length > 0;

    if (!isVisitTypeValid) {
      setVisitTypeErrorMessage("Visit Type is required");
    }

    if (!isAppointmentDateValid) {
      setAppointmentDateErrorMessage("Invalid Date");
    }
    if (!isAppointmentTimeValid) {
      setAppointmentTimeErrorMessage("Invalid Time");
    }

    if (!isSpecializationValid) {
      setSpecializationErrorMessage("Please select a Specialization");
    }

    if (!isDoctorValid) {
      setDoctorSelectionErrorMessage("Please select a Doctor");
    }

    // return true if all fields are valid
    return (
      isVisitTypeValid &&
      isAppointmentDateValid &&
      isAppointmentTimeValid &&
      isSpecializationValid &&
      isDoctorValid
    );
  };

  // * Form submission
  const handleSubmit = () => {
    if (!appointmentDate) {
      setAppointmentDateErrorMessage("Appointment date is required");
      return;
    }
    if (!appointmentTime) {
      setAppointmentTimeErrorMessage("Appointment Time is required");
      return;
    }

    const createAppointmentData = {
      patient: userDetails,
      doctor: doctorSelection, // contains specialization
      appointmentDate: appointmentDate.format("YYYY-MM-DD"),
      appointmentTime: appointmentTime.format("HH:mm"),
      visitType: visitTypeSelection,
    };

    if (validateForm()) {
      // Pass data to parent component
      onSubmit(createAppointmentData);
    }
  };

  const formContainerStyling = {
    // width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  };

  const formStyling = {
    width: "60%",
    gap: "20px",
    maxWidth: "400px",
    marginTop: "8px",
  };

  // hidden button for testing
  const hiddenButton = () => {
    setAppointmentDate(dayjs("1998-02-25"));
    setVisitTypeSelection("newemail1@email.com");
    setSpecialization("Jerry");
    setDoctorSelection("Fisher");
  };

  return (
    <>
      <AppBar sx={{ position: "relative", marginBottom: "60px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create Appointment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={formContainerStyling}>
        {/* <div onClick={hiddenButton}>autofill</div> */}
        <Box>
          <Typography>Creating an Appointment for::</Typography>
          <Typography>Patient details go here</Typography>
        </Box>
        <FormControl sx={formStyling} onKeyDown={handleKeyDown}>
          {/* convert to dropdown selector field */}
          <CustomTextField
            id="specialization-selection-input"
            label="Specialization Selection"
            value={specialization}
            onChange={handleUpdateSpecializationChange}
            placeholder="Jerry"
            errorMessage={specializationErrorMessage}
          />

          {/* convert to dropdown selector field */}
          <CustomTextField
            id="doctor-selection-input"
            label="Doctor Selection"
            value={doctorSelection}
            onChange={handleUpdateDoctorSelectionChange}
            placeholder="Smith"
            errorMessage={doctorSelectionErrorMessage}
          />
          <CustomDatePicker
            errorMessage={appointmentDateErrorMessage}
            birthDate={appointmentDate}
            onChange={handleAppointmentDateChange}
            label="Appointment Date"
            disablePast={true}
          />

          {/* convert to time selector field */}
          <CustomDatePicker
            errorMessage={appointmentTimeErrorMessage}
            birthDate={appointmentTime}
            onChange={handleAppointmentTimeChange}
            label="Appointment Date"
            disablePast={true}
          />

          {/* convert to dropdown selector field */}
          <CustomTextField
            id="visit-type-input"
            label="Visit Type"
            value={visitTypeSelection}
            onChange={handleUpdateVisitTypeChange}
            placeholder="email@example.com"
            errorMessage={visitTypeErrorMessage}
          />
          <Button
            autoFocus
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Confirm Appointment
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
