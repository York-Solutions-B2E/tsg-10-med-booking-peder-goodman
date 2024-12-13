export {};

declare global {
  interface AuthCheckResponse {
    authenticated: boolean;
    userDetails: AdminDetails | PatientDetails | null;
    message: string;
  }

  interface LogoutResponse {
    message: string;
    logoutUrl: string;
    idToken: string;
  }

  interface PatientLoginRequest {
    email: string;
    birthdate: string;
  }

  interface PatientSignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
  }

  interface AppointmentRequest {
    id?: number;
    patient: PatientDetails;
    doctor: DoctorDetails;
    appointmentDate: string;
    appointmentTime: string;
    visitType: VisitType;
  }

  interface DoctorRequest {
    id?: number;
    firstName: string;
    lastName: string;
    specialization: Specialization;
  }
}
