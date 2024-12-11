import { store } from "../store/store";

export {};
declare global {
  export type RootState = ReturnType<typeof store.getState>;

  interface AppState {
    user: UserState;
    medicalOptions: MedicalOptionsState;
    appointments: AppointmentsState;
  }
  interface UserState {
    isLoading: boolean;
    isUserAuthenticated: boolean;
    isPatientAuthenticated: boolean;
    userDetails: AdminDetails | PatientDetails;
    errorMessage: string | null;
  }

  interface MedicalOptionsState {
    isLoading: boolean;
    availableSpecializations: Specialization[];
    availableDoctors: DoctorDetails[];
    errorMessage: string | null;
  }

  interface AppointmentsState {
    isLoading: boolean;
    currentPatientAppointments: Appointment[];
    selectedDoctorsAppointments: Appointment[];
    // doctorAvailability: string[];
    errorMessage: string | null;
  }
}
