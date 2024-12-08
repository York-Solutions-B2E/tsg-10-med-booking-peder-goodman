package com.health_care.med_booking_backend.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.PatientRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

@Configuration
public class DatabaseSeeder {
        @Bean
        CommandLineRunner seedDatabase(
                        SpecializationRepository specializationRepository,
                        DoctorRepository doctorRepository,
                        PatientRepository patientRepository,
                        AppointmentRepository appointmentRepository) {

                return args -> {

                        boolean specializationCount = specializationRepository.count() > 0;
                        boolean doctorCount = doctorRepository.count() > 0;
                        boolean patientCount = patientRepository.count() > 0;
                        boolean appointmentCount = appointmentRepository.count() > 0;

                        System.out.println("Specialization count: " + specializationCount);
                        System.out.println("Doctor count: " + doctorCount);
                        System.out.println("Patient count: " + patientCount);
                        System.out.println("Appointment count: " + appointmentCount);

                        // If the database is not empty, do not seed it
                        if (!specializationCount && !doctorCount && !patientCount && !appointmentCount) {

                                // Create List of specializations
                                Specialization cardiology = new Specialization("Cardiology");
                                Specialization pediatrics = new Specialization("Pediatrics");
                                Specialization dermatology = new Specialization("Dermatology");
                                Specialization orthopedics = new Specialization("Orthopedics");
                                Specialization neurology = new Specialization("Neurology");

                                List<Specialization> listOfSpecializations = List.of(cardiology, pediatrics,
                                                dermatology, orthopedics, neurology);

                                // Seed database with specializations
                                specializationRepository.saveAll(listOfSpecializations);

                                // ! Print Specializations
                                System.out.println("Specializations look like: " + List.of(cardiology, pediatrics));

                                // Create List of Doctors
                                // Cardiology
                                Doctor doctor1 = new Doctor("Val Purrs", "Ventric", cardiology);
                                Doctor doctor2 = new Doctor("Bea T.", "Barker", cardiology);
                                Doctor doctor3 = new Doctor("Art H.", "Eagle", cardiology);
                                Doctor doctor4 = new Doctor("Ana Paw", "Gram", cardiology);
                                // Pediatrics
                                Doctor doctor5 = new Doctor("Hammy C.", "Care", pediatrics);
                                Doctor doctor6 = new Doctor("Pippa P.", "Peep", pediatrics);
                                Doctor doctor7 = new Doctor("Minnie Whiskers", "Troubles", pediatrics);
                                // Dermatology
                                Doctor doctor8 = new Doctor("Derm A.", "Scratch", dermatology);
                                Doctor doctor9 = new Doctor("Rashy P.", "Furball", dermatology);
                                Doctor doctor10 = new Doctor("E. Cheeky", "Tion", dermatology);
                                Doctor doctor11 = new Doctor("Skin P.", "Feathers", dermatology);
                                Doctor doctor12 = new Doctor("Mel O.", "Pelt", dermatology);
                                // Orthopedics
                                Doctor doctor13 = new Doctor("Fracture P.", "Hopper", orthopedics);
                                Doctor doctor14 = new Doctor("Patella P.", "Scurry", orthopedics);
                                // Neurology
                                Doctor doctor15 = new Doctor("Neuro B.", "Fluff", neurology);
                                Doctor doctor16 = new Doctor("Myra T.", "Squeak", neurology);
                                Doctor doctor17 = new Doctor("Axel C.", "Claws", neurology);
                                Doctor doctor18 = new Doctor("Syn A.", "Pounce", neurology);

                                List<Doctor> listOfDoctors = List.of(doctor1, doctor2, doctor3, doctor4, doctor5,
                                                doctor6, doctor7,
                                                doctor8,
                                                doctor9, doctor10, doctor11, doctor12, doctor13, doctor14, doctor15,
                                                doctor16, doctor17,
                                                doctor18);

                                // Seed database with doctors
                                doctorRepository.saveAll(listOfDoctors);

                                // ! Print Doctors
                                System.out.println(
                                                "Doctors look like: " + List.of(doctor1, doctor2, doctor3));

                                // create List of Patients
                                Patient patient1 = new Patient("Willow", "Woods", "willow.woods@example.com",
                                                LocalDate.of(1990, 3, 15));
                                Patient patient2 = new Patient("Forrest", "Green", "forrest.green@example.com",
                                                LocalDate.of(1985, 6, 20));
                                Patient patient3 = new Patient("River", "Brook", "river.brook@example.com",
                                                LocalDate.of(1992, 9, 12));
                                Patient patient4 = new Patient("Sunny", "Field", "sunny.field@example.com",
                                                LocalDate.of(1988, 7, 1));
                                Patient patient5 = new Patient("Aspen", "Grove", "aspen.grove@example.com",
                                                LocalDate.of(1995, 11, 25));
                                Patient patient6 = new Patient("Ivy", "Moss", "ivy.moss@example.com",
                                                LocalDate.of(2000, 2, 14));
                                Patient patient7 = new Patient("Reed", "Stone", "reed.stone@example.com",
                                                LocalDate.of(1983, 8, 10));
                                Patient patient8 = new Patient("Sky", "Meadow", "sky.meadow@example.com",
                                                LocalDate.of(1998, 4, 5));
                                Patient patient9 = new Patient("Maple", "Hill", "maple.hill@example.com",
                                                LocalDate.of(1993, 12, 30));
                                Patient patient10 = new Patient("Cliff", "Leaf", "cliff.leaf@example.com",
                                                LocalDate.of(1980, 5, 17));
                                Patient patient11 = new Patient("Fern", "Vale", "fern.vale@example.com",
                                                LocalDate.of(1991, 1, 3));
                                Patient patient12 = new Patient("Blossom", "Petal", "blossom.petal@example.com",
                                                LocalDate.of(1987, 10, 21));
                                Patient patient13 = new Patient("Cedar", "Trail", "cedar.trail@example.com",
                                                LocalDate.of(1979, 7, 9));
                                Patient patient14 = new Patient("Lake", "Shore", "lake.shore@example.com",
                                                LocalDate.of(1994, 5, 26));
                                Patient patient15 = new Patient("Daisy", "Bloom", "daisy.bloom@example.com",
                                                LocalDate.of(1999, 4, 11));
                                Patient patient16 = new Patient("Pine", "Forest", "pine.forest@example.com",
                                                LocalDate.of(1986, 6, 30));
                                Patient patient17 = new Patient("Violet", "Garden", "violet.garden@example.com",
                                                LocalDate.of(1997, 8, 15));
                                Patient patient18 = new Patient("Ash", "Glen", "ash.glen@example.com",
                                                LocalDate.of(1992, 12, 3));
                                Patient patient19 = new Patient("Rose", "Thorn", "rose.thorn@example.com",
                                                LocalDate.of(1984, 2, 29));
                                Patient patient20 = new Patient("Birch", "Haven", "birch.haven@example.com",
                                                LocalDate.of(1995, 11, 18));
                                Patient patient21 = new Patient("Clover", "Field", "clover.field@example.com",
                                                LocalDate.of(2001, 9, 20));
                                Patient patient22 = new Patient("Juniper", "Dell", "juniper.dell@example.com",
                                                LocalDate.of(1982, 3, 8));
                                Patient patient23 = new Patient("Briar", "Patch", "briar.patch@example.com",
                                                LocalDate.of(1996, 4, 14));
                                Patient patient24 = new Patient("Sage", "Cliff", "sage.cliff@example.com",
                                                LocalDate.of(1990, 7, 19));
                                Patient patient25 = new Patient("Laurel", "Branch", "laurel.branch@example.com",
                                                LocalDate.of(1993, 5, 6));

                                List<Patient> listOfPatients = List.of(patient1, patient2, patient3, patient4, patient5,
                                                patient6, patient7, patient8, patient9, patient10, patient11, patient12,
                                                patient13, patient14, patient15, patient16, patient17, patient18,
                                                patient19, patient20, patient21, patient22, patient23, patient24,
                                                patient25);

                                // Seed database with patients
                                patientRepository.saveAll(listOfPatients);

                                // ! Print Patients
                                System.out
                                                .println("Patients look like: "
                                                                + List.of(patient1, patient2, patient3));

                                // Create List of Appointments
                                List<Appointment> appointments = AppointmentSeeder.generateAppointments(listOfPatients,
                                                listOfDoctors);
                                // Appointment appointment1 = new Appointment()

                                // Seed database with appointments
                                appointmentRepository.saveAll(appointments);

                                // ! Print Appointments
                                AppointmentSeeder.printTestSomeAppointments(appointments);
                        } else {
                                System.out.println("Database is already seeded!");
                        }
                };
        }
}
