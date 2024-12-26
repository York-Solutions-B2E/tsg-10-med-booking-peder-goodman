import { IconButton, Tooltip } from "@mui/material";

interface ButtonIconWithToolTipProps {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  icon: React.ReactElement;
  color?: "primary" | "secondary" | "error" | "inherit" | "default" | "info" | "success" | "warning";
}

export const ButtonIconWithToolTip = (props: ButtonIconWithToolTipProps) => {
  const { color = "primary", onClick, disabled = false, tooltip = "", icon } = props;

  const iconButtonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <IconButton color={color} disabled={disabled} sx={iconButtonStyle} onClick={onClick}>
      <Tooltip title={tooltip}>{icon}</Tooltip>
    </IconButton>
  );
};
