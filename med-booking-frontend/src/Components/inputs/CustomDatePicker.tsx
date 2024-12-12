import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDatePicker = (props: any) => {
  const { label, birthDate, onChange, errorMessage, disableFuture, disablePast} = props;

  const datePickerStyling = {
    marginBottom: "10px",
    backgroundColor: "white",
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
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

export default CustomDatePicker;
