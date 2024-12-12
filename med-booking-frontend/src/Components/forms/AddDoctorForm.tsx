import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { CustomDropdownInput } from "../inputs/CustomDropdownInput";
import { CustomTextField } from "../inputs/CustomTextInput";

export const AddDoctorForm = (props: any) => {
  const { onSubmit, onCancel } = props;
  const availableSpecializations = useSelector(
    (state: RootState) => state.medicalOptions.availableSpecializations
  );

  // * Form state
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    Specialization | ""
  >("");
  const [
    selectSpecializationErrorMessage,
    setSelectSpecializationErrorMessage,
  ] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  // * Event handlers
  const handleSelectSpecializationChange = (newValue: Specialization | "") => {
    if (newValue && typeof newValue !== "string") {
      setSelectedSpecialization(newValue);
      setSelectSpecializationErrorMessage("");
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
    const isSpecializationValid = selectedSpecialization !== "";
    const isFirstNameValid = firstName.length > 0;
    const isLastNameValid = lastName.length > 0;

    if (!isSpecializationValid) {
      setSelectSpecializationErrorMessage("Please Select a Specialization");
    }

    if (!isFirstNameValid) {
      setFirstNameErrorMessage("Please enter the Doctor's first name");
    }

    if (!isLastNameValid) {
      setLastNameErrorMessage("Please enter the Doctor's last name");
    }

    return isSpecializationValid && isFirstNameValid && isLastNameValid;
  };

  // * Form submission
  const handleSubmit = () => {
    const addDoctorData = {
      firstName,
      lastName,
      selectedSpecialization,
    };

    if (validateForm()) {
      // passes data to parent component
      onSubmit(addDoctorData);
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
    setSelectedSpecialization({ id: 1, name: "Cardiology" });
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

          {/* <InputLabel id={`select-specialization-input-label`}>Specialization</InputLabel> */}
          <CustomDropdownInput
            inputId="select-specialization-input"
            label="Specialization"
            selectedValue={selectedSpecialization}
            onChange={handleSelectSpecializationChange}
            dropdownOptions={availableSpecializations}
            errorMessage={selectSpecializationErrorMessage}
          />
          {/* <FormHelperText>{selectSpecializationErrorMessage}</FormHelperText> */}

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
