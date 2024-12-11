export {};

// * Base Data types
declare global {
  // ** User
  interface UserDetails {
    id: string;
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
    id: string;
    firstName: string;
    lastName: string;
    specialty: Specialization;
  }

  interface Specialization {
    id: string;
    name: string;
  }

  // ** Appointments

  interface Appointment {
    id: string;
    patient: PatientDetails;
    doctor: DoctorDetails;
    specialization: Specialization;
    appointmentDate: string;
    appointmentTime: string;
    visitType: VisitType;
    appointmentStatus: AppointmentStatus;
  }

  type VisitType = "IN_PERSON" | "TELEHEALTH";

  type AppointmentStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED";
}
