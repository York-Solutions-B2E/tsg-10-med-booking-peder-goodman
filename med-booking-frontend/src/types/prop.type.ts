import { Dayjs } from "dayjs";

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

  interface TimeDropdownInputProps {
    inputId: string;
    label: string;
    disabled: boolean;
    selectedDate: string;
    errorMessage: string;
    doctorAvailability: DoctorAvailability | null;
    selectedValue: string;
    onChange: (value: string) => void;
  }

  interface CustomDatePickerProps {
    label: string;
    selectedDate: string;
    disabled?: boolean;
    onChange: (date: Dayjs | null) => void;
    errorMessage: string;
    disableFuture?: boolean;
    disablePast?: boolean;
  }
  interface CustomTimePickerProps {
    label: string;
    selectedTime: string;
    disabled?: boolean;
    onChange: (date: string) => void;
    errorMessage: string;
    disableFuture?: boolean;
    disablePast?: boolean;
  }

  interface AppointmentFormProps {
    formData?: AppointmentRequest;
    isEditing?: boolean;
    onCancel: () => void;
    closeModal: () => void;
  }

  interface DoctorFormProps {
    editFormData?: DoctorRequest;
    isEditing?: boolean;
    onCancel: () => void;
    closeModal: () => void;
  }

  interface ConfirmationAppointmentModalProps {
    color: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
    open: boolean;
    onDismiss: () => void;
    onConfirmAction: () => void;
    appointment: AppointmentRequest;
    confirmButtonText: string;
  }
}
