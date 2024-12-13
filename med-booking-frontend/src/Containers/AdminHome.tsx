import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddDoctorModalButton from "../Components/buttons/AddDoctorModalButton";
import DoctorDataGrid from "../Components/data-display/DoctorDataGrid";
import { getSpecializationsAndDoctors } from "../store/actions/doctorActions";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";

const AdminHome = () => {
  const { userDetails, isLoading, isUserAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
    store.dispatch(getSpecializationsAndDoctors());
  }, []);

  const appointmentPageStyling = {
    padding: "30px 60px",
  };

  return (
    <Box sx={appointmentPageStyling}>
      <AddDoctorModalButton />
      <DoctorDataGrid />
    </Box>
  );
};

export default AdminHome;
