import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createDoctor, getSpecializationsAndDoctors, updateDoctor } from "../../store/actions/doctorActions";
import { store } from "../../store/store";
import { CustomTextField } from "../inputs/CustomTextInput";
import { SpecializationDropdownInput } from "../inputs/SpecializationDropdownInput";
import { ConfirmActionModal } from "../modals/ConfirmActionModal";

export const DoctorForm = (props: DoctorFormProps) => {
  // * Props & Store state
  const { closeModal, onCancel, editFormData, isEditing } = props;
  const availableSpecializations = useSelector((state: RootState) => state.medicalOptions.availableSpecializations);

  // * Initial Form state
  const [doctorFormData, setDoctorFormData] = useState<DoctorRequest | undefined>(undefined);
  // Specialization
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | "">("");
  const [selectSpecializationErrorMessage, setSelectSpecializationErrorMessage] = useState("");
  // First Name
  const [firstName, setFirstName] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  // Last Name
  const [lastName, setLastName] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  useEffect(() => {
    if (isEditing && editFormData) {
      setSelectedSpecialization(editFormData.specialization);
      setFirstName(editFormData.firstName);
      setLastName(editFormData.lastName);
    }
  }, []);

  // * Form Input Event handlers
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

  // * Confirmation Modal handlers
  const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false);

  const handleCloseConfirmSubmitModal = () => {
    setOpenConfirmSubmit(false);
  };

  const handleConfirmSubmit = () => {
    console.log("Submitting appointment form data");
    if (isEditing) {
      submitEditDoctor();
    } else {
      submitNewDoctor();
    }
  };

  const submitEditDoctor = async () => {
    // create new doctor and update state
    await store.dispatch(updateDoctor(doctorFormData as DoctorRequest));
    // TODO: error handling
    store.dispatch(getSpecializationsAndDoctors());
    // close all modals
    setOpenConfirmSubmit(false);
    closeModal();
  };

  const submitNewDoctor = async () => {
    // create new doctor and update state
    await store.dispatch(createDoctor(doctorFormData as DoctorRequest));
    // TODO: error handling
    store.dispatch(getSpecializationsAndDoctors());
    // close all modals
    setOpenConfirmSubmit(false);
    closeModal();
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
    const isFormValid = validateForm();

    const combineDoctorData: DoctorRequest = {
      firstName,
      lastName,
      specialization: selectedSpecialization as Specialization,
    };

    if (isFormValid) {
      setOpenConfirmSubmit(true);
      setDoctorFormData(combineDoctorData as DoctorRequest);
    }
  };

  // * Styling
  // TODO: move to separate file
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

  // * Keyboard event handlers
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     handleSubmit();
  //   }
  // };

  return (
    <>
      <Box sx={formContainerStyling}>
        <Box sx={formButtonStyling}>
          <Typography sx={{ ml: 2 }} variant="h6" component="div">
            {isEditing ? "Edit Doctor" : "Add New Doctor"}
          </Typography>
          <IconButton edge="start" color="inherit" onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl sx={formControlStyling}>
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

          <SpecializationDropdownInput
            inputId="select-specialization-input"
            label="Specialization"
            selectedValue={selectedSpecialization}
            onChange={handleSelectSpecializationChange}
            dropdownOptions={availableSpecializations}
            errorMessage={selectSpecializationErrorMessage}
          />

          <Button autoFocus onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? "Save Changes" : "Add Doctor"}
          </Button>
        </FormControl>

        <ConfirmActionModal
          color="success"
          message="Are you sure?"
          open={openConfirmSubmit}
          handleCancel={handleCloseConfirmSubmitModal}
          handleConfirm={handleConfirmSubmit}
          confirmButtonText={isEditing ? "Save Changes" : "Add Doctor"}
        />
      </Box>
    </>
  );
};
