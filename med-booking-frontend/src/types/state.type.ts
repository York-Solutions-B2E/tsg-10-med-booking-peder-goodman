export {};
declare global {
  interface UserState {
    isLoading: boolean;
    isUserAuthenticated: boolean;
    userDetails: AdminDetails | PatientDetails | null;
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
