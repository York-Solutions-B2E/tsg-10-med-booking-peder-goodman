package com.health_care.med_booking_backend.repository;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.model.VisitType;

@ActiveProfiles("test")
@DataJpaTest
public class DoctorRepositoryTest {

        @Mock
        private DoctorRepository doctorRepository;
        @Mock
        private SpecializationRepository specializationRepository;
        @Mock
        private AppointmentRepository appointmentRepository;
        @Mock
        private PatientRepository patientRepository;

        private Doctor doctor1;
        private Doctor doctor2;
        private Specialization cardiology;
        private Specialization orthopedics;
        private Patient patient1;
        private Patient patient2;

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);

                // Add common test data
                cardiology = new Specialization("Cardiology");
                orthopedics = new Specialization("Orthopedics");
                doctor1 = new Doctor("John", "Doe", cardiology);
                doctor2 = new Doctor("Jane", "Smith", orthopedics);
                patient1 = new Patient("Alice", "Brown", "alice@gmail.com", LocalDate.parse("1990-07-12"));
                patient2 = new Patient("Corey", "Goodman", "corey@gmail.com", LocalDate.parse("1988-12-22"));
        }

        void setUpAppointments() {
                // Arrange
                Appointment appointment1 = new Appointment(patient1, doctor1, LocalDate.now(), LocalTime.now(),
                                VisitType.IN_PERSON, AppointmentStatus.BOOKED);
                Appointment appointment3 = new Appointment(patient1, doctor1, LocalDate.now().plusDays(2),
                                LocalTime.now(),
                                VisitType.IN_PERSON, AppointmentStatus.BOOKED);
                when(doctorRepository.findAppointmentsByDoctorIdAndNotBooked(doctor1.getId()))
                                .thenReturn(Arrays.asList(appointment1, appointment3));
        }

        // * Test the findAppointmentsByDoctorIdAndNotBooked method
        @Test
        void testFindAppointmentsByDoctorIdAndNotBooked_returnsEmptyList() {
                // Arrange
                when(doctorRepository.findAppointmentsByDoctorIdAndNotBooked(doctor2.getId()))
                                .thenReturn(Collections.emptyList());

                // Act
                List<Appointment> appointments = doctorRepository
                                .findAppointmentsByDoctorIdAndNotBooked(doctor2.getId());

                // Assert
                assertThat(appointments).isEmpty(); // Assuming no appointments are booked initially
        }

        @Test
        void testFindAppointmentsByDoctorIdAndNotBooked_skipsCanceledAppointments() {
                // Arrange
                // add appointments to the mock repository
                setUpAppointments();

                // Act
                List<Appointment> appointments = doctorRepository
                                .findAppointmentsByDoctorIdAndNotBooked(doctor1.getId());

                // Assert
                assertThat(appointments).hasSize(2);
                assertThat(appointments).extracting(Appointment::getAppointmentStatus)
                                .doesNotContain(AppointmentStatus.CANCELED);
                assertThat(appointments).extracting(Appointment::getAppointmentStatus)
                                .containsOnly(AppointmentStatus.BOOKED);
        }

        // * Test the findDoctorByFirstNameAndLastNameAndSpecialization method
        // test that doctor is found
        @Test
        void testFindDoctorByFirstNameAndLastNameAndSpecialization_returnsDoctor() {
                // Arrange
                when(doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization("John", "Doe", cardiology))
                                .thenReturn(Optional.of(doctor1));

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
                // Arrange
                when(doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization("Jermey", "Smith", cardiology))
                                .thenReturn(Optional.empty());
                // Act
                Optional<Doctor> foundDoctor = doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization(
                                "Jermey", "Smith", cardiology);

                // Assert
                assertThat(foundDoctor).isEmpty();
        }
}
