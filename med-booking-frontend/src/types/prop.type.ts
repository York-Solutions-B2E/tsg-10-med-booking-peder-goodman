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
    onCancel: () => void;
    onSubmit: (data: any) => void;
    children: React.ReactNode;
  }
}
