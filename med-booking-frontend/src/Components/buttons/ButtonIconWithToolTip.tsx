import { IconButton, Tooltip } from "@mui/material";

interface ButtonIconWithToolTipProps {
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
  icon: React.ReactElement;
}

export const ButtonIconWithToolTip = (props: ButtonIconWithToolTipProps) => {
  const { onClick, disabled = false, tooltip = "", icon } = props;

  const iconButtonStyle = {
    padding: "6px 6px",
    minWidth: "24px",
  };

  return (
    <IconButton disabled={disabled} sx={iconButtonStyle} color="primary" onClick={onClick}>
      <Tooltip title={tooltip}>{icon}</Tooltip>
    </IconButton>
  );
};
