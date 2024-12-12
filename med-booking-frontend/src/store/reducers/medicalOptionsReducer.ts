import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

import {
  getDoctorAvailability,
  getSpecializationsAndDoctors,
} from "../actions/doctorActions";

const initialState: any = {
  isLoading: false,
  specializations: [],
  doctorsList: [],
  selectedDoctorAvailability: {},
  visitTypes: ["IN_PERSON", "TELEHEALTH"],
  errorMessage: null,
};

const medicalOptionsSlice = createSlice({
  name: "medicalOptionsStateSlice",
  initialState: initialState,
  reducers: {
    resetMedicalOptionsState: () => initialState,
  },
  extraReducers: (builder) => {
    getSpecializationsAndDoctorsCases(builder);
    getDoctorAvailabilityCases(builder);
  },
});

const getSpecializationsAndDoctorsCases = (
  builder: ActionReducerMapBuilder<any>
) => {
  builder.addCase(getSpecializationsAndDoctors.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.errorMessage = null;
    state.isLoading = true;
  });
  builder.addCase(getSpecializationsAndDoctors.fulfilled, (state, action) => {
    console.log(
      "getSpecializationsAndDoctors.fulfilled payload: ",
      action.payload
    );

    // Set the lists of specializations and doctors options
    state.specializations = action.payload.specializations;
    state.doctors = action.payload.doctors;

    // Clear any previous errors and set loading to false
    state.errorMessage = null;
    state.isLoading = false;
  });
  builder.addCase(getSpecializationsAndDoctors.rejected, (state, action) => {
    console.log(
      "getSpecializationsAndDoctors.rejected payload: ",
      action.payload
    );
    state.error = action.payload;
    state.isLoading = false;
  });
};

const getDoctorAvailabilityCases = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getDoctorAvailability.pending, (state, action) => {
    // Clears any previous errors and set loading
    state.errorMessage = null;
    state.isLoading = true;
  });
  builder.addCase(getDoctorAvailability.fulfilled, (state, action) => {
    console.log("getDoctorAvailability.fulfilled payload: ", action.payload);

    // Set the selected doctor's availability
    state.selectedDoctorAvailability = action.payload;
    // Clear any previous errors and set loading to false
    state.errorMessage = null;
    state.isLoading = false;
  });
  builder.addCase(getDoctorAvailability.rejected, (state, action) => {
    console.log("getDoctorAvailability.rejected payload: ", action.payload);
    state.error = action.payload;
    state.isLoading = false;
  });
};

// export any actions in the reducer (not counting extraReducers)
export const { resetMedicalOptionsState } = medicalOptionsSlice.actions;
// export the reducer
export default medicalOptionsSlice.reducer;