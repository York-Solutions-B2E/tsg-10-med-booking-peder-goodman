import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDatePicker = (props: any) => {
    const { birthDate, onChange } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        sx={{ marginTop: "20px" }}
        label="Date of Birth"
        value={birthDate}
        onChange={onChange}
        disableFuture
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
