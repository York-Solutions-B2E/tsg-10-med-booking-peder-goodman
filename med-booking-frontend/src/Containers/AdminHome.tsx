import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkUserAuthentication } from "../store/actions/userActions";
import { store } from "../store/store";
import CreateAppointmentModalButton from "../Components/buttons/CreateAppointmentModalButton";
import DoctorDataGrid from "../Components/data-display/DoctorDataGrid";
import AddDoctorModalButton from "../Components/buttons/AddDoctorModalButton";

const AdminHome = () => {
  const { userDetails, isLoading, isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    store.dispatch(checkUserAuthentication());
    // store.dispatch(getAllDoctors());
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
