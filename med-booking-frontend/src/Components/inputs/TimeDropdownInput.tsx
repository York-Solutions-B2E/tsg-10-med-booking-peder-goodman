import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { generateTimeSlots } from "../../utils/helperFunctions";

interface TimeDropdownInputProps {
  inputId: string;
  label: string;
  disabled: boolean;
  selectedDate: Dayjs | null;
  errorMessage: string;
  doctorAvailability: DoctorAvailability | null;
  selectedValue: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

interface TimeSlot {
  date: string;
  time: string;
  isAvailable: boolean;
}

export const TimeDropdownInput = (props: TimeDropdownInputProps) => {
  const { inputId, label, disabled, errorMessage, selectedDate, doctorAvailability, selectedValue, onChange } = props;

  const dropdownFieldStyling = {
    backgroundColor: "white",
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedTime = dayjs(event.target.value, "HH:mm A");
    let updatedDateTime = dayjs();
    if (selectedDate) {
      updatedDateTime = selectedDate.hour(selectedTime.hour()).minute(selectedTime.minute());
      console.log("selectedDate", selectedDate);
      console.log("updatedDateTime", updatedDateTime);
      onChange(updatedDateTime);
    }
  };

  // Generate time slots between 8:00 AM and 7:00 PM
  const timeSlots = generateTimeSlots(8, 19); // "HH:mm A" format

  return (
    <FormControl sx={{ width: "50%" }} error={!!errorMessage}>
      <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
      <Select
        id={inputId}
        label={label}
        labelId={`${inputId}-label`}
        value={selectedValue?.format("HH:mm A") || ""}
        disabled={disabled}
        onChange={handleChange}
        error={!!errorMessage}
        sx={dropdownFieldStyling}
        aria-label={label + " input"}
      >
        <MenuItem value="">
          <em>Available Times</em>
        </MenuItem>

        {timeSlots.map((slot) => (
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
