import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { useEffect } from "react";

const dropdownFieldStyling = {
  backgroundColor: "white",
};

export const TimeDropdownInput = (props: TimeDropdownInputProps) => {
  const { inputId, label, disabled, errorMessage, doctorAvailability, selectedValue, onChange } = props;
  const formattedSelectedValue = selectedValue ? dayjs(selectedValue, "HH:mm").format("HH:mm A") : "";

  useEffect(() => {
    console.log("in Time dropdown doctorAvailability length:", doctorAvailability?.length);
  }, [doctorAvailability]);

  const handleChange = (event: SelectChangeEvent) => {
    const updatedDateTimeFormatted = dayjs(event.target.value, "HH:mm A").format("HH:mm");
    onChange(updatedDateTimeFormatted);
  };

  return (
    <FormControl sx={{ width: "50%" }} error={!!errorMessage}>
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
        id={inputId}
        label={label}
        labelId={`${inputId}-label`}
        value={formattedSelectedValue}
        disabled={disabled}
        onChange={handleChange}
        error={!!errorMessage}
        sx={dropdownFieldStyling}
        aria-label={label + " input"}
      >
        <MenuItem value="">
          <em>Available Times</em>
        </MenuItem>

        {doctorAvailability?.map((slot) => (
          <MenuItem key={slot} value={slot}>
            {slot}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{disabled && "Select a Date first"}</FormHelperText>
      <FormHelperText>{errorMessage || ""}</FormHelperText>
    </FormControl>
  );
};
