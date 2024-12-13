import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export const SpecializationDropdownInput = (props: SpecializationDropdownInputProps) => {
  const { inputId, selectedValue, label, errorMessage, dropdownOptions, onBlur, onChange } = props;

  const dropdownFieldStyling = {
    backgroundColor: "white",
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = Number(event.target.value);
    const selectedObject = dropdownOptions.find((option: Specialization) => option.id === selectedId);

    onChange(selectedObject || "");
  };

  return (
    <FormControl error={!!errorMessage}>
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
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

        {dropdownOptions.map((option: Specialization) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage || ""}</FormHelperText>
    </FormControl>
  );
};
