import { Button } from "@mui/material";

const CustomButton = (props: any) => {
  const { buttonText, onClick } = props;

  const buttonStyling = {
    marginTop: "20px"
  }
  
  return (
    <Button sx={buttonStyling} variant="contained" onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default CustomButton;
