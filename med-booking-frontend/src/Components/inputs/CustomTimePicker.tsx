import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomTimePicker = (props: CustomTimePickerProps) => {
  const { label, birthDate, disabled, onChange, errorMessage, disableFuture, disablePast } = props;

  const datePickerStyling = {
    marginBottom: "10px",
    backgroundColor: "white",
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <TimePicker
        disabled={disabled}
        slotProps={{
          textField: {
            error: errorMessage ? true : false, // Bolean
            helperText: errorMessage, // String
          },
        }}
        sx={datePickerStyling}
        label={label}
        value={birthDate}
        onChange={onChange}
        disablePast={disablePast}
        disableFuture={disableFuture}
      />
    </LocalizationProvider>
  );
};
