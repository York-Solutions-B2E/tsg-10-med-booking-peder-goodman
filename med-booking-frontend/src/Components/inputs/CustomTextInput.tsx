import { TextField } from "@mui/material";

export const CustomTextField = (props: any) => {
  const {
    inputId,
    value,
    placeholder,
    label,
    error,
    errorMessage,
    onBlur,
    onChange,
    color,
  } = props;

  return (
    <TextField
      id={inputId}
      label={label}
      aria-label={label + " input"}
      value={value}
      onChange={onChange}
      onBlur={() => console.log("onBlur")}
      placeholder={placeholder}
      error={error}
      helperText={error && errorMessage}
      fullWidth
    />
  );
};
