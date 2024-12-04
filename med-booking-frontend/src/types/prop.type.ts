export {};

declare global {
  type NavigationProps = {
    isUserAuthenticated: boolean;
  };

  type ProtectedRouteProps = {
    requiredRole: Role;
  }
}
