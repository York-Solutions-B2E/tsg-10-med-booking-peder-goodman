export {};

declare global {
  type NavigationProps = {
    isUserAuthenticated: boolean;
    isPatientAuthenticated: boolean;
  };

  type ProtectedRouteProps = {
    requiredRole: Role;
  };

  interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
}
