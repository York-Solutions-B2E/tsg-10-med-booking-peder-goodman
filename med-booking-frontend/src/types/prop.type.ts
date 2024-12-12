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

  interface AppointmentModalButtonProps {
    appointment: Appointment;
  }

  interface DoctorModalButtonProps {
    doctor: DoctorDetails;
  }

  interface CustomDropdownInputProps {
    inputId: string;
    selectedValue: Specialization | "";
    label: string;
    errorMessage: string | null;
    dropdownOptions: Specialization[];
    onBlur?: () => void;
    onChange: (selectedObject: Specialization | "") => void;
  }
}
