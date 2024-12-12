export {};

// * Base Data types
declare global {
  // ** User
  interface UserDetails {
    id: number | null;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    role: Role;
  }

  interface AdminDetails extends UserDetails {
    oktaId: string;
  }

  interface PatientDetails extends UserDetails {
    birthdate: string;
    patientAppointments: Appointment[];
  }

  type Role = "ADMIN" | "PATIENT" | null;

  // ** Doctors & Specializations

  interface DoctorDetails {
    id: number;
    firstName: string;
    lastName: string;
    specialization: Specialization;
  }

  interface Specialization {
    id: number;
    name: string;
  }

  interface DoctorAvailability extends DoctorDetails {
    selectedDoctorAvailability: DoctorAppointment[];
  }

  // ** Appointments

  interface Appointment {
    id: number;
    patient: PatientDetails;
    doctor: DoctorDetails;
    appointmentDate: string;
    appointmentTime: string;
    visitType: VisitType;
    appointmentStatus: AppointmentStatus;
  }

  interface DoctorAppointment {
    id: number;
    patient: PatientDetails;
    appointmentDate: string;
    appointmentTime: string;
    visitType: VisitType;
    appointmentStatus: AppointmentStatus;
  }
  type VisitType = "IN_PERSON" | "TELEHEALTH";

  type AppointmentStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

/**  
 import AddIcon from "@mui/icons-material/Add";

    <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Appointment
      </Button>

 */
