import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createAppointment, updateAppointment } from "../../store/actions/appointmentActions";
import { getDoctorAvailability } from "../../store/actions/doctorActions";
import { getPatientDetails } from "../../store/actions/userActions";
import { resetSelectedDoctorAvailability } from "../../store/reducers/medicalOptionsReducer";
import { store } from "../../store/store";
import { filterSelectedDaysAvailableSlots } from "../../utils/helperFunctions";
import { validateDateIsInFuture, validateTimeIsInFuture } from "../../utils/validationFunctions";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { DoctorDropdownInput } from "../inputs/DoctorDropdownInput";
import { SpecializationDropdownInput } from "../inputs/SpecializationDropdownInput";
import { TimeDropdownInput } from "../inputs/TimeDropdownInput";
import { VisitTypeDropdownInput } from "../inputs/VisitTypeDropdownInput";
import { AppointmentConfirmationModal } from "../modals/AppointmentConfirmationModal";

// * Styling
// TODO: move styling to separate file
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

// ** FUNCTION START **
export const AppointmentForm = (props: AppointmentFormProps) => {
  // * Props & Store state
  const { formData, isEditing, onCancel, closeModal } = props;
  const { availableSpecializations, availableDoctors, selectedDoctorAvailability } = useSelector((state: RootState) => state.medicalOptions);
  const patientDetails = useSelector((state: RootState) => state.user.userDetails as PatientDetails);
  const formattedPatientBirthdate = dayjs(patientDetails.birthdate).format("MMM DD, YYYY");

  // * Initial Form state
  const [appointmentFormData, setAppointmentFormData] = useState<AppointmentRequest | undefined>(undefined);
  // Visit Type
  const [visitTypeSelection, setVisitTypeSelection] = useState<VisitType | "">("");
  const [visitTypeErrorMessage, setVisitTypeErrorMessage] = useState("");
  // Appointment Date
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentDateErrorMessage, setAppointmentDateErrorMessage] = useState("");
  // Appointment Time
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [appointmentTimeErrorMessage, setAppointmentTimeErrorMessage] = useState("");
  // Specialization
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | "">("");
  const [selectedSpecializationErrorMessage, setSelectSpecializationErrorMessage] = useState("");
  // Doctor
  const [selectedDoctor, setDoctorSelection] = useState<DoctorDetails | "">("");
  const [selectedDoctorErrorMessage, setSelectedDoctorErrorMessage] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorDetails[]>([]);
  // Unavailable Times
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // * Initialize form data if editing
  useEffect(() => {
    if (isEditing && formData) {
      // set the filtered doctors based on the selected specialization

      handleSelectSpecializationChange(formData.doctor.specialization);
      handleSelectedDoctorChange(formData.doctor);
      handleAppointmentDateChange(dayjs(formData.appointmentDate));
      handleAppointmentTimeChange(formData.appointmentTime);
      handleUpdateVisitTypeChange(formData.visitType);
    } else {
      store.dispatch(resetSelectedDoctorAvailability());
    }
  }, []);

  // * Filter available times based on selected date
  useEffect(() => {
    const doctorAvailability = filterSelectedDaysAvailableSlots(
      selectedDoctorAvailability?.doctorAppointments as DoctorAppointment[],
      appointmentDate,
      patientDetails.id as number,
      patientDetails?.patientAppointments as Appointment[]
    );
    setAvailableTimes(doctorAvailability);
  }, [selectedDoctorAvailability, appointmentDate]);

  // * Form Input Event handlers
  const handleUpdateVisitTypeChange = (newValue: VisitType | "") => {
    setVisitTypeSelection(newValue);
    setVisitTypeErrorMessage("");
  };

  const handleAppointmentDateChange = (newValue: Dayjs | null) => {
    setAppointmentDate(newValue?.format("YYYY-MM-DD") || "");
    setAppointmentDateErrorMessage("");
    setAppointmentTime("");
    setAppointmentTimeErrorMessage("");
  };

  const handleAppointmentTimeChange = (newValue: string) => {
    setAppointmentTime(newValue);
    setAppointmentTimeErrorMessage("");
  };

  const handleSelectSpecializationChange = (newValue: Specialization | "") => {
    // set selected specialization
    setSelectedSpecialization(newValue);
    setSelectSpecializationErrorMessage("");

    // rest date fields
    setAppointmentDate("");
    setAppointmentTime("");

    // filter doctors based on selected specialization
    if (newValue !== "") {
      setFilteredDoctors(availableDoctors.filter((doctor) => doctor.specialization.id === newValue.id));
    }
    // clear filtered doctors if specialization is deselected
    if (newValue === "") {
      setFilteredDoctors([]);
    }
  };

  const handleSelectedDoctorChange = async (newValue: DoctorDetails | "") => {
    setDoctorSelection(newValue);
    setSelectedDoctorErrorMessage("");
    // get doctor availability
    if (newValue !== "") {
      // fetch selected doctor availability
      await store.dispatch(getDoctorAvailability(newValue.id));
    } else {
      // clear doctor availability if no doctor is selected
      store.dispatch(resetSelectedDoctorAvailability());
    }
    // clear appointment time if doctor selection changes
    setAppointmentTime("");
  };

  // * Confirmation Modal handlers
  const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false);

  const handleCloseConfirmSubmitModal = () => {
    setOpenConfirmSubmit(false);
  };

  const handleConfirmSubmit = () => {
    if (isEditing) {
      submitEditAppointment();
    } else {
      submitNewAppointment();
    }
  };

  // * Form submission handlers
  const submitEditAppointment = async () => {
    // update appointment and refresh state
    await store.dispatch(updateAppointment(appointmentFormData as AppointmentRequest));
    // TODO: error handling
    store.dispatch(getPatientDetails(appointmentFormData?.patient.id as number));
    // close all modals
    setOpenConfirmSubmit(false);
    closeModal();
  };

  const submitNewAppointment = async () => {
    // create new appointment and refresh state
    await store.dispatch(createAppointment(appointmentFormData as AppointmentRequest));
    // TODO: error handling
    store.dispatch(getPatientDetails(patientDetails.id as number));
    // close all modals
    setOpenConfirmSubmit(false);
    closeModal();
  };

  // * Form validation
  const validateForm = () => {
    const appointmentDateTime = dayjs(appointmentDate + appointmentTime);

    const isVisitTypeValid = visitTypeSelection.length > 0;
    const isAppointmentDateValid = validateDateIsInFuture(dayjs(appointmentDate, "YYYY-MM-DD"));
    const isAppointmentTimeValid = validateTimeIsInFuture(appointmentDateTime);
    const isSpecializationValid = selectedSpecialization !== "";
    const isDoctorValid = selectedDoctor !== "";

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

    const appointmentFormMergeData = {
      id: formData?.id,
      patient: patientDetails,
      doctor: selectedDoctor, // contains specialization
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      visitType: visitTypeSelection,
    };

    if (isFormValid) {
      setOpenConfirmSubmit(true);
      setAppointmentFormData(appointmentFormMergeData as AppointmentRequest);
    }
  };

  // * Keyboard event handlers
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     handleSubmit();
  //   }
  // };

  const onHiddenButtonClick = () => {
    console.log("hidden button clicked");
    const specilizatoinToSet = availableSpecializations.find((spec) => spec.name === "Cardiology");
    const doctorToSet = availableDoctors.find((doc) => doc.id === 2);

    handleSelectSpecializationChange(specilizatoinToSet || "");
    handleSelectedDoctorChange(doctorToSet || "");
    handleAppointmentDateChange(dayjs("2024-12-28"));
  };

  return (
    <>
      <AppBar sx={{ position: "relative", marginBottom: "60px" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {isEditing ? "Edit Appointment" : "Create Appointment"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={formContainerStyling}>
        {/* TODO: add styling to patient details */}
        <Box sx={{ display: "flex", flexDirection: "column", margin: "0 0 30px", gap: "6px" }}>
          <Typography variant="h4" component="div">
            Patient Details
          </Typography>
          <Typography>{`Patient Name: ${patientDetails.firstName} ${patientDetails.lastName}`}</Typography>
          <Typography>{`Patient Email: ${patientDetails.email}`}</Typography>
          <Typography onClick={onHiddenButtonClick}>{`Date of Birth: ${formattedPatientBirthdate}`}</Typography>
        </Box>
        <FormControl sx={formStyling}>
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
              selectedDate={appointmentDate}
              onChange={handleAppointmentDateChange}
              label="Appointment Date"
              disablePast={true}
            />

            <TimeDropdownInput
              doctorAvailability={availableTimes}
              disabled={appointmentDate === ""}
              inputId={""}
              selectedValue={appointmentTime}
              label="Apt Time"
              errorMessage={appointmentTimeErrorMessage}
              onChange={handleAppointmentTimeChange}
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
            {isEditing ? "Confirm Update" : "Confirm Appointment"}
          </Button>
        </FormControl>
      </Box>
      {/* TODO: edit logging for "isEditing" or not  */}
      <AppointmentConfirmationModal
        appointment={appointmentFormData as AppointmentRequest}
        color="success"
        open={openConfirmSubmit}
        onDismiss={handleCloseConfirmSubmitModal}
        onConfirmAction={handleConfirmSubmit}
        confirmButtonText={isEditing ? "Update Appointment" : "Confirm Appointment"}
      />
    </>
  );
};
