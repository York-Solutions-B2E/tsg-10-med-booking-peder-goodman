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

  interface SpecializationDropdownInputProps {
    inputId: string;
    selectedValue: Specialization | "";
    label: string;
    errorMessage: string | null;
    dropdownOptions: Specialization[];
    onBlur?: () => void;
    onChange: (selectedObject: Specialization | "") => void;
  }

  interface DoctorDropdownInputProps {
    disabled: boolean;
    inputId: string;
    selectedValue: DoctorDetails | "";
    label: string;
    errorMessage: string | null;
    dropdownOptions: DoctorDetails[];
    onBlur?: () => void;
    onChange: (selectedObject: DoctorDetails | "") => void;
  }

  interface VisitTypeDropdownInputProps {
    inputId: string;
    selectedValue: VisitType | "";
    label: string;
    errorMessage: string | null;
    dropdownOptions: VisitType[];
    onBlur?: () => void;
    onChange: (selectedObject: VisitType | "") => void;
  }

  interface CustomDatePickerProps {
    label: string;
    birthDate: any;
    disabled?: boolean;
    onChange: (date: any) => void;
    errorMessage: string;
    disableFuture?: boolean;
    disablePast?: boolean;
  }
  interface CustomTimePickerProps {
    label: string;
    birthDate: any;
    disabled?: boolean;
    onChange: (date: any) => void;
    errorMessage: string;
    disableFuture?: boolean;
    disablePast?: boolean;
  }
}
