import { Box, FormControl, FormHelperText } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import CustomButton from "../inputs/CustomButton";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

import { loginPatient } from "../../store/actions/userActions";
import { store } from "../../store/store";
import {
  validateDateIsInPast,
  validateEmail,
} from "../../utils/validationFunctions";

export const LoginForm = () => {
  // * Form state
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleClickLoginButton();
    }
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isBirthDateValid = validateDateIsInPast(birthDate);

    if (!isEmailValid) {
      setEmailErrorMessage("Invalid Email");
    }

    if (!isBirthDateValid) {
      setBirthDateErrorMessage("Birth date must be in the past");
    }

    return isEmailValid && isBirthDateValid;
  };

  // * Form submission
  const handleClickLoginButton = () => {
    if (!birthDate) {
      setBirthDateErrorMessage("Birth date is required");
      return;
    }

    const patientLoginData: LoginRequest = {
      email,
      birthDate: birthDate.format("YYYY-MM-DD"),
    };

    if (validateForm()) {
      console.log("submitting form");
      console.log(patientLoginData);
      store.dispatch(loginPatient(patientLoginData));
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
          id="login-email-input"
          label="email address"
          value={email}
          onChange={handleUpdateEmailChange}
          onBlur={handleLeaveEmailField}
          placeholder="email@example.com"
          errorMessage={emailErrorMessage}
        />

        <CustomDatePicker
          errorMessage={birthDateErrorMessage}
          birthDate={birthDate}
          onChange={handleDateChange}
        />

        <CustomButton buttonText="Login" onClick={handleClickLoginButton} />

        {/* <CustomAlert message="Error Logging in" /> */}
      </FormControl>
    </Box>
  );
};
