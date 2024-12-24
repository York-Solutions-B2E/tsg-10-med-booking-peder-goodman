import { Button } from "@mui/material";

interface ButtonWithTextProps {
  onClick: () => void;
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  buttonText?: React.ReactNode;
}

const buttonStyling = {
  margin: "15px 0",
};

export const ButtonWithText = (props: ButtonWithTextProps) => {
  const { onClick, variant = "contained", disabled = false, buttonText = "click me", startIcon, endIcon } = props;

  return (
    <Button sx={buttonStyling} variant={variant} color="primary" disabled={disabled} startIcon={startIcon} endIcon={endIcon} onClick={onClick}>
      {buttonText}
    </Button>
  );
};
