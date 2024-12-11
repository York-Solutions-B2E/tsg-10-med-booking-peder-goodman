import { Box, FormControl, FormHelperText } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import CustomButton from "../inputs/CustomButton";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

import { signupPatient } from "../../store/actions/userActions";
import { store } from "../../store/store";
import {
  validateDateIsInPast,
  validateEmail,
} from "../../utils/validationFunctions";

export const SignupForm = () => {
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
      handleClickSignupButton();
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
  const handleClickSignupButton = () => {
    if (!birthDate) {
      setBirthDateErrorMessage("Birth date is required");
      return;
    }

    const patientSignupData = {
      firstName,
      lastName,
      email,
      birthdate: birthDate.format("YYYY-MM-DD"),
    };

    if (validateForm()) {
      console.log("submitting form");
      console.log(patientSignupData);
      store.dispatch(signupPatient(patientSignupData));
    }
  };

  const formContainerStyling = {
    width: "80%",
  };

  const formStyling = {
    width: "100%",
  };

  return (
    <Box sx={formContainerStyling}>
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
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

        <CustomDatePicker
          errorMessage={birthDateErrorMessage}
          birthDate={birthDate}
          onChange={handleDateChange}
        />

        <CustomButton buttonText="Signup" onClick={handleClickSignupButton} />

        {/* <CustomAlert message="Error Logging in" /> */}
      </FormControl>
    </Box>
  );
};
