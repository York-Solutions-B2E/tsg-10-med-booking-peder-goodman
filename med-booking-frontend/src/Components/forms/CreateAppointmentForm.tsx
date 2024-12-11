import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import {
  validateDateIsInPast,
  validateEmail,
} from "../../utils/validationFunctions";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

export const CreateAppointmentForm = (props: any) => {
  const { onSubmit, onCancel } = props; // ! change to correct function names

  // * Form state
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  // * Event handlers
  const handleUpdateEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailErrorMessage("");
  };

  const handleDateChange = (newValue: any) => {
    setBirthDate(newValue);
    setBirthDateErrorMessage("");
  };

  const handleLeaveEmailField = () => {
    if (!validateEmail(email)) {
      setEmailErrorMessage("Invalid Email");
    }
  };

  const handleUpdateFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameErrorMessage("");
  };

  const handleUpdateLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameErrorMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // * Form validation
  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isBirthDateValid = validateDateIsInPast(birthDate);
    const isFirstNameValid = firstName.length > 0;
    const isLastNameValid = lastName.length > 0;

    if (!isEmailValid) {
      setEmailErrorMessage("Invalid Email");
    }

    if (!isBirthDateValid) {
      setBirthDateErrorMessage("Invalid Date");
    }

    if (!isFirstNameValid) {
      setFirstNameErrorMessage("Please enter your first name");
    }

    if (!isLastNameValid) {
      setLastNameErrorMessage("Please enter your last name");
    }

    return (
      isEmailValid && isBirthDateValid && isFirstNameValid && isLastNameValid
    );
  };

  // * Form submission
  const handleSubmit = () => {
    if (!birthDate) {
      setBirthDateErrorMessage("Birth date is required");
      return;
    }

    const createAppointmentData = {
      firstName,
      lastName,
      email,
      birthdate: birthDate.format("YYYY-MM-DD"),
    };

    if (validateForm()) {
      console.log("submitting form");
      console.log(createAppointmentData);
      onSubmit(createAppointmentData);
      // store.dispatch(signupPatient(patientSignupData));
    }
  };

  const formContainerStyling = {
    // width: "80%",
    display: "flex",
    justifyContent: "center",
  };

  const formStyling = {
    width: "60%",
    gap: "20px",
    maxWidth: "400px",
    marginTop: "8px",
  };

  // hidden button for testing
  const hiddenButton = () => {
    setBirthDate(dayjs("1998-02-25"));
    setEmail("newemail1@email.com");
    setFirstName("Jerry");
    setLastName("Fisher");
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
          <Button autoFocus color="inherit" onClick={handleSubmit}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={formContainerStyling}>
        {/* <div onClick={hiddenButton}>autofill</div> */}
        <FormControl sx={formStyling} onKeyDown={handleKeyDown}>
          <CustomTextField
            id="signup-email-input"
            label="Email Address"
            value={email}
            onChange={handleUpdateEmailChange}
            onBlur={handleLeaveEmailField}
            placeholder="email@example.com"
            errorMessage={emailErrorMessage}
          />

          <CustomTextField
            id="signup-first-name-input"
            label="First Name"
            value={firstName}
            onChange={handleUpdateFirstNameChange}
            placeholder="Jerry"
            errorMessage={firstNameErrorMessage}
          />

          <CustomTextField
            id="signup-last-name-input"
            label="Last Name"
            value={lastName}
            onChange={handleUpdateLastNameChange}
            placeholder="Smith"
            errorMessage={lastNameErrorMessage}
          />

          <CustomTextField
            id="signup-first-name-input"
            label="First Name"
            value={firstName}
            onChange={handleUpdateFirstNameChange}
            placeholder="Jerry"
            errorMessage={firstNameErrorMessage}
          />

          <CustomTextField
            id="signup-last-name-input"
            label="Last Name"
            value={lastName}
            onChange={handleUpdateLastNameChange}
            placeholder="Smith"
            errorMessage={lastNameErrorMessage}
          />

          <CustomDatePicker
            errorMessage={birthDateErrorMessage}
            birthDate={birthDate}
            onChange={handleDateChange}
            label="Birth Date"
          />
          {/* <CustomAlert message="Error Logging in" /> */}
        </FormControl>
      </Box>
    </>
  );
};
