import { Height } from "@mui/icons-material";
import { Box } from "@mui/material";

export const Layout = (props: any) => {
  const { children } = props;
  // requiredRoles is an array of roles that are allowed to access the route

  const layoutStyling = {
    minHeight: "100vh",
    paddingTop: "64px", // Adjust this value based on the height of your navbar
    boxSizing: "border-box",
  };
  // otherwise, render the component
  return <Box className="layout" sx={layoutStyling}>{children}</Box>;
};
