import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import {
  validateDateIsInPast,
  validateEmail,
} from "../../utils/validationFunctions";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

export const AddDoctorForm = (props: any) => {
  const { onSubmit, onCancel } = props; // ! change to correct function names

  console.log("AddDoctorForm props", props);
  

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
    const isBirthDateValid = validateDateIsInPast(birthDate);
    const isFirstNameValid = firstName.length > 0;
    const isLastNameValid = lastName.length > 0;

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
      isBirthDateValid && isFirstNameValid && isLastNameValid
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
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: "10px 16px 24px",
  };

  const formButtonStyling = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const formControlStyling = {
    display: "flex",
    width: "60%",
    gap: "20px",
    maxWidth: "400px",
    marginTop: "32px",
    alignSelf: "center",
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
      <Box sx={formContainerStyling}>
        <Box sx={formButtonStyling}>
          <Typography sx={{ ml: 2 }} variant="h6" component="div">
            Add New Doctor
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* <div onClick={hiddenButton}>autofill</div> */}
        <FormControl sx={formControlStyling} onKeyDown={handleKeyDown}>
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

          <Button
            autoFocus
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            save
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
