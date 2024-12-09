package com.health_care.med_booking_backend.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.context.annotation.Configuration;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.VisitType;

@Configuration
public class AppointmentSeeder {

    private static final Random random = new Random();

    // Method to generate appointments
    public static List<Appointment> generateAppointments(List<Patient> patients, List<Doctor> doctors) {
        List<Appointment> appointments = new ArrayList<>();

        for (Patient patient : patients) {
            int numAppointments = random.nextInt(9) + 2; // At least 2 appointments, up to 10

            // Choose the main doctor for this patient
            Doctor mainDoctor = doctors.get(random.nextInt(doctors.size()));

            // Generate appointments for the patient
            Set<LocalDateTime> takenDates = new HashSet<>();

            for (int i = 0; i < numAppointments; i++) {
                // Randomize appointment date: between a week before and 2-3 weeks from today
                LocalDateTime appointmentDate = getRandomAppointmentDate();
                while (takenDates.contains(appointmentDate)) {
                    appointmentDate = getRandomAppointmentDate(); // Ensure unique appointment time
                }
                takenDates.add(appointmentDate);

                // Select the visit type (80% IN_PERSON)
                VisitType visitType = random.nextInt(100) < 80 ? VisitType.IN_PERSON : VisitType.TELEHELTH;

                // Select the appointment status should be BOOKED by default
                AppointmentStatus status = AppointmentStatus.BOOKED;

                // Randomly sprinkle in some canceled appointments
                if (random.nextInt(100) < 10) {
                    status = AppointmentStatus.CANCELED;
                }

                // The appointment can either be with the main doctor or sometimes another
                // doctor
                Doctor doctor = (i < numAppointments - 2 || random.nextInt(100) < 80) ? mainDoctor
                        : getRandomOtherDoctor(doctors, mainDoctor);

                appointments.add(new Appointment(patient, doctor, appointmentDate, visitType, status));
            }
        }

        return appointments;
    }

    // Generate a random appointment date within the specified range
    private static LocalDateTime getRandomAppointmentDate() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startRange = now.minusWeeks(1); // 1 week before
        LocalDateTime endRange = now.plusWeeks(3); // 2-3 weeks ahead

        long randomTime = startRange.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                + (long) (random.nextDouble() * (endRange.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()
                        - startRange.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()));

        LocalDateTime randomDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(randomTime),
                ZoneId.systemDefault());

        // Ensure the time falls between 8am and 8pm
        int hour = random.nextInt(12) + 8; // 8am to 8pm
        return randomDateTime.withHour(hour).withMinute(0).withSecond(0).withNano(0);
    }

    // Randomly choose another doctor (not the main one for the patient)
    private static Doctor getRandomOtherDoctor(List<Doctor> doctors, Doctor mainDoctor) {
        Doctor doctor;
        do {
            doctor = doctors.get(random.nextInt(doctors.size()));
        } while (doctor.equals(mainDoctor));
        return doctor;
    }

    // Main method to test the generation of appointments
    public static void printTestSomeAppointments(List<Appointment> appointments) {

        // Print appointments (for demo purposes)
        for (int i = 0; i < 130; i += 15) {
            System.out.println("Patient: " + appointments.get(i).getPatient().getFirstName() + ", Doctor: "
                    + appointments.get(i).getDoctor().getFirstName() + ", Date: "
                    + appointments.get(i).getAppointmentDate()
                    + ", Visit Type: "
                    + appointments.get(i).getVisitType() + ", Status: " + appointments.get(i).getAppointmentStatus());
        }
    }

    public static void printTestAllAppointments(List<Appointment> appointments) {
        // Print all appointments (for demo purposes)
        appointments.forEach(appointment -> {
            System.out.println("Patient: " + appointment.getPatient().getFirstName() +
                    ", Doctor: " + appointment.getDoctor().getFirstName() +
                    ", Date: " + appointment.getAppointmentDate() +
                    ", Visit Type: " + appointment.getVisitType() +
                    ", Status: " + appointment.getAppointmentStatus());
        });
    }
}
