export {};

declare global {
  type NavigationProps = {
    isUserAuthenticated: boolean;
    isPatientAuthenticated: boolean;
  };

  type ProtectedRouteProps = {
    requiredRole: Role;
  }
}
