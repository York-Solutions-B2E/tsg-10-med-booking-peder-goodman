import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import {
  checkUserAuthentication,
  loginPatient,
  logoutUser,
  // signupPatient,
} from "../actions/userActions";

const initialState: UserState = {
  isLoading: false,
  isUserAuthenticated: false,
  isPatientAuthenticated: false,
  userDetails: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "", // ? add a method to get the full name? or just use firstName + lastName
    email: "",
    role: null,
    birthdate: "",
    oktaId: "",
  },
  errorMessage: null,
};

const userSlice = createSlice({
  name: "userStateSlice",
  initialState: initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    adminLogoutCases(builder);
    userAuthenticationCases(builder);
    // patientSignupCases(builder);
    patientLoginCases(builder);
  },
});

const adminLogoutCases = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(logoutUser.pending, (state, action) => {
    state.errorMessage = null; // Clears any previous errors
  });
  builder.addCase(logoutUser.fulfilled, (state, action) => {
    state = resetUserState();
  });
  builder.addCase(logoutUser.rejected, (state, action) => {
    state.errorMessage = action.error.message;
  });
};

const userAuthenticationCases = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(checkUserAuthentication.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.errorMessage = null;
    state.isLoading = true;
  });
  builder.addCase(checkUserAuthentication.fulfilled, (state, action) => {
    if (action.payload.authenticated) {
      // If user is authenticated, set the user details
      state.isUserAuthenticated = true;
      state.userDetails = action.payload.userDetails;
    } else if (state.isPatientAuthenticated) {
      // If user is a patient, set the patient details, do nothing
      console.log("User is a patient");
    } else {
      // If user is not authenticated, clear the user details
      state.isUserAuthenticated = false;
      state.userDetails = initialState; // will be null
    }
    // Clear any previous errors and set loading to false
    state.errorMessage = null;
    state.isLoading = false;
  });
  builder.addCase(checkUserAuthentication.rejected, (state, action) => {
    state.isUserAuthenticated = false;
    state.error = action.error.message;
    state.loadingAuth = false;
  });
};

const patientLoginCases = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(loginPatient.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.errorMessage = null;
    state.isLoading = true;
  });
  builder.addCase(loginPatient.fulfilled, (state, action) => {
    console.log("loginPatient.fulfilled payload: ", action.payload);
    // If user is authenticated, set the user details
    state.isPatientAuthenticated = true;
    state.userDetails = action.payload;
    // Clear any previous errors and set loading to false
    state.errorMessage = null;
    state.isLoading = false;
  });
  builder.addCase(loginPatient.rejected, (state, action) => {
    console.log("loginPatient.rejected payload: ", action.payload);
    state.isUserAuthenticated = false;
    state.error = action.payload;
    state.loadingAuth = false;
  });
};


// export any actions in the reducer (not counting extraReducers)
export const { resetUserState } = userSlice.actions;
// export the reducer
export default userSlice.reducer;
