import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export const VisitTypeDropdownInput = (props: VisitTypeDropdownInputProps) => {
  const { inputId, selectedValue, label, errorMessage, dropdownOptions, onBlur, onChange } = props;

  const dropdownFieldStyling = {
    backgroundColor: "white",
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = event.target.value as VisitType;

    onChange(selectedOption || "");
  };

  return (
    <FormControl error={!!errorMessage}>
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${inputId}-label`}
        id={inputId}
        value={selectedValue }
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

        {dropdownOptions.map((option: VisitType) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage || ""}</FormHelperText>
    </FormControl>
  );
};
