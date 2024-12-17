package com.health_care.med_booking_backend.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.model.VisitType;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@DataJpaTest
public class DoctorRepositoryTest {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private SpecializationRepository specializationRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private PatientRepository patientRepository;

    private Doctor doctor1;
    private Doctor doctor2;
    private Specialization cardiology;
    private Specialization orthopedics;
    private Patient patient1;
    private Patient patient2;

    @BeforeEach
    void setUp() {
        // Clear the repository before each test
        doctorRepository.deleteAll();
        specializationRepository.deleteAll();
        appointmentRepository.deleteAll();
        patientRepository.deleteAll();

        // Add common test data
        cardiology = new Specialization("Cardiology");
        orthopedics = new Specialization("Orthopedics");
        specializationRepository.save(cardiology);
        specializationRepository.save(orthopedics);

        doctor1 = new Doctor("John", "Doe", cardiology);
        doctor2 = new Doctor("Jane", "Smith", orthopedics);
        doctorRepository.save(doctor1);
        doctorRepository.save(doctor2);
        patient1 = new Patient("Alice", "Brown", "alice@gmail.com", LocalDate.parse("1990-07-12"));
        patient2 = new Patient("Corey", "Goodman", "corey@gmail.com", LocalDate.parse("1988-12-22"));
        patientRepository.save(patient1);
        patientRepository.save(patient2);
    }

    void setUpAppointments() {
        // Arrange
        Appointment appointment1 = new Appointment(patient1, doctor1, LocalDate.now(), LocalTime.now(),
                VisitType.IN_PERSON, AppointmentStatus.BOOKED);
        Appointment appointment2 = new Appointment(patient2, doctor1, LocalDate.now().plusDays(1), LocalTime.now(),
                VisitType.IN_PERSON, AppointmentStatus.CANCELED);
        Appointment appointment3 = new Appointment(patient1, doctor1, LocalDate.now().plusDays(2), LocalTime.now(),
                VisitType.IN_PERSON, AppointmentStatus.BOOKED);
        appointmentRepository.save(appointment1);
        appointmentRepository.save(appointment2);
        appointmentRepository.save(appointment3);
    }

    // * Test the findAppointmentsByDoctorIdAndNotBooked method
    @Test
    void testFindAppointmentsByDoctorIdAndNotBooked_returnsEmptyList() {
        // Act
        List<Appointment> appointments = doctorRepository.findAppointmentsByDoctorIdAndNotBooked(doctor1.getId());

        // Assert
        assertThat(appointments).isEmpty(); // Assuming no appointments are booked initially
    }

    @Test
    void testFindAppointmentsByDoctorIdAndNotBooked_skipsCanceledAppointments() {
        // Arrange
        // add appointments to the mock repository
        setUpAppointments();

        // Act
        List<Appointment> appointments = doctorRepository.findAppointmentsByDoctorIdAndNotBooked(doctor1.getId());

        // Assert
        assertThat(appointments).hasSize(2);
        assertThat(appointments).extracting(Appointment::getAppointmentStatus)
                .doesNotContain(AppointmentStatus.CANCELED);
        assertThat(appointments).extracting(Appointment::getAppointmentStatus).containsOnly(AppointmentStatus.BOOKED);

    }

    // * Test the findDoctorByFirstNameAndLastNameAndSpecialization method
    // test that doctor is found
    @Test
    void testFindDoctorByFirstNameAndLastNameAndSpecialization_returnsDoctor() {
        // Act
        Optional<Doctor> foundDoctor = doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization(
                "John", "Doe", cardiology);

        // Assert
        assertThat(foundDoctor).isPresent();
        assertThat(foundDoctor.get().getFirstName()).isEqualTo("John");
        assertThat(foundDoctor.get().getLastName()).isEqualTo("Doe");
        assertThat(foundDoctor.get().getSpecialization().getName()).isEqualTo("Cardiology");
    }

    // test that doctor is not found
    @Test
    void testFindDoctorByFirstNameAndLastNameAndSpecialization_returnsIsEmpty() {
        // Act
        Optional<Doctor> foundDoctor = doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization(
                "Jermey", "Smith", cardiology);

        // Assert
        assertThat(foundDoctor).isEmpty();
    }
}
