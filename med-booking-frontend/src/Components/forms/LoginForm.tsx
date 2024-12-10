import { Box, FormControl, FormHelperText } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import CustomButton from "../inputs/CustomButton";
import CustomDatePicker from "../inputs/CustomDatePicker";
import { CustomTextField } from "../inputs/CustomTextInput";

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
      setBirthDateErrorMessage("Invalid Date");
    }

    return isEmailValid && isBirthDateValid;
  };

  // * Form submission
  const handleClickLoginButton = () => {
    const patientLoginData = {
      email,
      birthDate: birthDate?.format("YYYY-MM-DD"),
    };

    if (validateForm()) {
      console.log("submitting form");
      console.log(patientLoginData);
      // store.dispatch(loginPatient(email, birthDate?.format("YYYY-MM-DD")));
    }
  };

  return (
    <Box>
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
      <FormControl sx={{ width: "400px" }} onKeyDown={handleKeyDown}>
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
