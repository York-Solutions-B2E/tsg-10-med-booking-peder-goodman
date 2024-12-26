import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { label, selectedDate, disabled, onChange, errorMessage, disableFuture, disablePast } = props;

  const datePickerStyling = {
    marginBottom: "10px",
    backgroundColor: "white",
  };

  const convertedDateValue = dayjs(selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        disabled={disabled}
        slotProps={{
          textField: {
            error: errorMessage ? true : false, // Bolean
            helperText: errorMessage, // String
          },
        }}
        sx={datePickerStyling}
        label={label}
        value={convertedDateValue}
        onChange={onChange}
        disablePast={disablePast}
        disableFuture={disableFuture}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
