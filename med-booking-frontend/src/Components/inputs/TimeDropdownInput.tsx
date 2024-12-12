import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { generateTimeSlots } from "../../utils/helperFunctions";

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

  // Filter out unavailable time slots
  const filterAvailableSlots = (slots: string[], bookedTimes: DoctorAvailability, appointmentDate: Dayjs) => {
    const today = dayjs();
    console.log("In Filter, today", today);

    // get todays date
    // get the selected date for the appointment
    // get the list of appointments that the doctor is not available
    // if selected date is today, filter out the past times
    // filter out the times that are already booked

    // return slots.filter((slot) => {
    //   const slotTime = dayjs(`${selectedDateTime.format("YYYY-MM-DD")} ${slot}`, "YYYY-MM-DD HH:mm A");
    //   const isPast = slotTime.isBefore(today);
    //   const isTaken = doctorAvailability.some((appointment: { appointmentDate: any; appointmentTime: any; }) => {
    //     const appointmentTime = dayjs(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm");
    //     return slotTime.isSame(appointmentTime);
    //   }
    // );

    // return !isPast && !isTaken;
    // });
  };

  // Generate time slots between 8:00 AM and 7:00 PM
  const timeSlots = generateTimeSlots(8, 19); // "HH:mm A" format
  // const availableSlots = filterAvailableSlots(timeSlots, doctorAvailability as DoctorAvailability, selectedDate as Dayjs);

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
