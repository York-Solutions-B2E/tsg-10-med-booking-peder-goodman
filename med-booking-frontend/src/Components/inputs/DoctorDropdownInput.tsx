import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export const DoctorDropdownInput = (props: DoctorDropdownInputProps) => {
  const { inputId, selectedValue, label, disabled,errorMessage, dropdownOptions, onBlur, onChange } = props;

  const dropdownFieldStyling = {
    backgroundColor: "white",
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value);
    const selectedObject = dropdownOptions.find((option: DoctorDetails) => option.id === selectedId);

    onChange(selectedObject || "");
  };

  return (
    <FormControl error={!!errorMessage}>
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
        disabled={disabled}
        labelId={`${inputId}-label`}
        id={inputId}
        value={selectedValue ? String(selectedValue.id) : ""}
        onChange={handleChange}
        onBlur={onBlur}
        label={label}
        error={!!errorMessage}
        sx={dropdownFieldStyling}
        aria-label={label + " input"}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {dropdownOptions.map((option: DoctorDetails) => (
          <MenuItem key={option.id} value={option.id}>
            {`Dr. ${option.firstName} ${option.lastName}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{disabled && "Please Select a Specialization first"}</FormHelperText>
      <FormHelperText>{errorMessage || ""}</FormHelperText>
    </FormControl>
  );
};
