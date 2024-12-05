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
}
