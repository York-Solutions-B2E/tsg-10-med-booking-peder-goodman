import { TextField } from "@mui/material";

export const CustomTextField = (props: any) => {
  const { inputId, value, placeholder, label, errorMessage, onBlur, onChange } =
    props;

  const textFieldStyling = {
    marginBottom: "10px",
  };
  return (
    <TextField
      sx={textFieldStyling}
      id={inputId}
      label={label}
      aria-label={label + " input"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={errorMessage ? true : false}
      helperText={errorMessage ? errorMessage : ""}
      fullWidth
    />
  );
};
