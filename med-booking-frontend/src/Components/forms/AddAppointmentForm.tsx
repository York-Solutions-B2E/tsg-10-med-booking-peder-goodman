import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getDoctorAvailability } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { validateDateIsInFuture } from "../../utils/validationFunctions";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { DoctorDropdownInput } from "../inputs/DoctorDropdownInput";
import { SpecializationDropdownInput } from "../inputs/SpecializationDropdownInput";
import { TimeDropdownInput } from "../inputs/TimeDropdownInput";
import { VisitTypeDropdownInput } from "../inputs/VisitTypeDropdownInput";

export const AddAppointmentForm = (props: any) => {
  // * State
  const { onSubmit, onCancel } = props; // ! change to correct function names
  const userDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const { availableSpecializations, availableDoctors, selectedDoctorAvailability } = useSelector((state: RootState) => state.medicalOptions);
  const patientBirthdate = dayjs(userDetails.birthdate).format("MMM DD, YYYY");

  // * Initial Form state
  // Visit Type
  const [visitTypeSelection, setVisitTypeSelection] = useState<VisitType | "">("");
  const [visitTypeErrorMessage, setVisitTypeErrorMessage] = useState("");

  // Appointment Date
  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [appointmentDateErrorMessage, setAppointmentDateErrorMessage] = useState("");
  // Appointment Time
  const [appointmentTime, setAppointmentTime] = useState<Dayjs | null>(null);
  const [appointmentTimeErrorMessage, setAppointmentTimeErrorMessage] = useState("");
  // Specialization
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | "">("");
  const [selectedSpecializationErrorMessage, setSelectSpecializationErrorMessage] = useState("");
  // Doctor
  const [selectedDoctor, setDoctorSelection] = useState<DoctorDetails | "">("");
  const [selectedDoctorErrorMessage, setSelectedDoctorErrorMessage] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorDetails[]>([]);
  // Unavailable Times
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);

  // * Event handlers
  const handleUpdateVisitTypeChange = (newValue: VisitType | "") => {
    setVisitTypeSelection(newValue);
    setVisitTypeErrorMessage("");
  };

  const handleAppointmentDateChange = (newValue: any) => {
    setAppointmentDate(newValue);
    setAppointmentDateErrorMessage("");
    setAppointmentTime(null);
  };

  const handleAppointmentTimeChange = (newValue: any) => {
    setAppointmentTime(newValue);
    setAppointmentTimeErrorMessage("");
  };

  const handleSelectSpecializationChange = (newValue: Specialization | "") => {
    // set selected specialization
    setSelectedSpecialization(newValue);
    setSelectSpecializationErrorMessage("");

    // filter doctors based on selected specialization
    if (newValue !== "") {
      setFilteredDoctors(availableDoctors.filter((doctor) => doctor.specialization.id === newValue.id));
    }
    // clear filtered doctors if specialization is deselected
    if (newValue === "") {
      setFilteredDoctors([]);
    }
  };

  const handleSelectedDoctorChange = (newValue: DoctorDetails | "") => {
    setDoctorSelection(newValue);
    setSelectedDoctorErrorMessage("");
    // get doctor availability
    if (newValue !== "") {
      // fetch selected doctor availability
      store.dispatch(getDoctorAvailability(newValue.id));
      console.log("selectedDoctorAvailability", selectedDoctorAvailability);
    }
    // clear appointment time if doctor selection changes
    setAppointmentTime(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // * Form validation
  const validateForm = () => {
    console.log("IN VALIDATE FORM");
    console.log("Date", appointmentDate);
    console.log("Time", appointmentTime);

    const isVisitTypeValid = visitTypeSelection.length > 0;
    const isAppointmentDateValid = validateDateIsInFuture(appointmentDate);
    const isAppointmentTimeValid = validateDateIsInFuture(appointmentTime);
    const isSpecializationValid = selectedSpecialization !== "";
    const isDoctorValid = selectedDoctor !== "";

    console.log("isVisitTypeValid", isVisitTypeValid);
    console.log("isAppointmentDateValid", isAppointmentDateValid);
    console.log("isAppointmentTimeValid", isAppointmentTimeValid);
    console.log("isSpecializationValid", isSpecializationValid);
    console.log("isDoctorValid", isDoctorValid);

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
      setSelectSpecializationErrorMessage("Please select a Specialization");
    }

    if (!isDoctorValid) {
      setSelectedDoctorErrorMessage("Please select a Doctor");
    }

    // return true if all fields are valid
    return isVisitTypeValid && isAppointmentDateValid && isAppointmentTimeValid && isSpecializationValid && isDoctorValid;
  };

  // * Form submission
  const handleSubmit = () => {
    const isFormValid = validateForm();

    if (!appointmentDate || !appointmentTime) {
      !appointmentDate && setAppointmentDateErrorMessage("Appointment date is required");
      !appointmentTime && setAppointmentTimeErrorMessage("Appointment Time is required");
      return;
    }

    const createAppointmentData = {
      patient: userDetails,
      doctor: selectedDoctor, // contains specialization
      appointmentDate: appointmentDate.format("YYYY-MM-DD"),
      appointmentTime: appointmentTime.format("HH:mm"),
      visitType: visitTypeSelection,
    };

    if (isFormValid) {
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
    // setVisitTypeSelection("newemail1@email.com");
    // setSpecialization("Jery");
    // setDoctorSelection("Fisher");
  };

  return (
    <>
      <AppBar sx={{ position: "relative", marginBottom: "60px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create Appointment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={formContainerStyling}>
        <Box sx={{ display: "flex", flexDirection: "column", margin: "0 0 30px", gap: "6px" }}>
          <Typography variant="h4" component="div">
            Patient Details
          </Typography>
          <Typography>{`Patient Name: ${userDetails.firstName} ${userDetails.lastName}`}</Typography>
          <Typography>{`Patient Email: ${userDetails.email}`}</Typography>
          <Typography>{`Date of Birth: ${patientBirthdate}`}</Typography>
        </Box>
        <FormControl sx={formStyling} onKeyDown={handleKeyDown}>
          <SpecializationDropdownInput
            inputId="select-specialization-input"
            label="Select Specialization"
            selectedValue={selectedSpecialization}
            onChange={handleSelectSpecializationChange}
            dropdownOptions={availableSpecializations}
            errorMessage={selectedSpecializationErrorMessage}
          />

          <DoctorDropdownInput
            disabled={selectedSpecialization === ""}
            inputId="select-specialization-input"
            label="Select Doctor"
            selectedValue={selectedDoctor}
            onChange={handleSelectedDoctorChange}
            dropdownOptions={filteredDoctors}
            errorMessage={selectedDoctorErrorMessage}
          />

          <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <CustomDatePicker
              disabled={selectedDoctor === ""}
              errorMessage={appointmentDateErrorMessage}
              birthDate={appointmentDate}
              onChange={handleAppointmentDateChange}
              label="Appointment Date"
              disablePast={true}
            />

            <TimeDropdownInput
              doctorAvailability={selectedDoctorAvailability}
              disabled={appointmentDate === null}
              inputId={""}
              selectedValue={appointmentTime}
              label="Appointment Time"
              errorMessage={appointmentTimeErrorMessage}
              // dropdownOptions={[]}
              onChange={handleAppointmentTimeChange}
              selectedDate={appointmentDate}
            />
          </Box>

          <VisitTypeDropdownInput
            inputId={"visit-type-input"}
            selectedValue={visitTypeSelection}
            label="Visit Type"
            errorMessage={visitTypeErrorMessage}
            dropdownOptions={["IN_PERSON", "TELEHEALTH"]}
            onChange={handleUpdateVisitTypeChange}
          />

          <Button autoFocus onClick={handleSubmit} variant="contained" color="primary">
            Confirm Appointment
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
