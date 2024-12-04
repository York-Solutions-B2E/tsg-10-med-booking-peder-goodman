export {};

declare global {
  interface AuthCheckResponse {
    authenticated: boolean;
    userDetails: AdminDetails | PatientDetails | null;
    message: string;
  }

  interface LogoutResponse {
    logoutUrl: string;
    idToken: string;
  }
}
