package com.health_care.med_booking_backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.dto.mappers.DoctorMapper;
import com.health_care.med_booking_backend.dto.requests.DoctorRequest;
import com.health_care.med_booking_backend.dto.responses.DoctorSpecializationListResponse;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.model.VisitType;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

@ActiveProfiles("test")
public class DoctorServiceTest {

    @Mock
    private DoctorRepository doctorRepository;

    @Mock
    private SpecializationRepository specializationRepository;

    @InjectMocks
    private DoctorService doctorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // * Tests for createNewDoctor method
    // Test case 1: Doctor already exists in the database
    @Test
    void testCreateNewDoctor_returnsAlreadyExists() {
        // Arrange
        Specialization cardiology = new Specialization("Cardiology");
        when(specializationRepository.save(cardiology)).thenReturn(cardiology);

        DoctorRequest doctorRequest = new DoctorRequest("John", "Doe", cardiology);
        Doctor existingDoctor = new Doctor("John", "Doe", cardiology);
        when(doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization("John", "Doe", cardiology))
                .thenReturn(Optional.of(existingDoctor));

        // Act
        ResponseEntity<String> response = doctorService.createNewDoctor(doctorRequest);

        // Assert
        assertEquals(400, response.getStatusCode().value());
        assertEquals("Doctor already exists in the Database with the same name and specialization", response.getBody());
    }

    // Test case 2: Doctor does not exist in the database
    @Test
    void testCreateNewDoctor_Created() {
        // Arrange
        Specialization cardiology = new Specialization(1L, "Cardiology");

        DoctorRequest doctorRequest = new DoctorRequest("John", "Doe", cardiology);
        when(doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization("John", "Doe", cardiology))
                .thenReturn(Optional.empty());

        // Act
        ResponseEntity<String> response = doctorService.createNewDoctor(doctorRequest);

        // Assert
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Doctor Created!", response.getBody());
        verify(doctorRepository, times(1)).save(any(Doctor.class));
    }

    // * Tests for deleteDoctor method
    // Test case 1: Doctor does not exist in the database
    @Test
    void testDeleteDoctor_doctorDoesntExist() {
        when(doctorRepository.existsById(1L)).thenReturn(false);

        ResponseEntity<String> response = doctorService.deleteDoctor(1L);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Couldn't find Doctor with id 1 in the Database", response.getBody());

    }

    // Test case 2: Doctor exists in the database
    @Test
    void testDeleteDoctor_doctorExists() {
        when(doctorRepository.existsById(2L)).thenReturn(true);

        ResponseEntity<String> response = doctorService.deleteDoctor(2L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Doctor Deleted! Doctor id is: 2", response.getBody());
        verify(doctorRepository, times(1)).deleteById(2L);
    }

    // * Tests for getDoctorById method
    // Test case 1: Doctor does not exist in the database
    @Test
    void testGetDoctorById_doctorDoesNotExist() {
        // Arrange
        when(doctorRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            doctorService.getDoctorById(1L);
        });

        assertEquals("Doctor with id 1 does not exist", exception.getMessage());
    }

    // Test case 2: Doctor exists in the database
    @Test
    void testGetDoctorById_doctorExist() {
        // Arrange
        Specialization cardiology = new Specialization(1L, "Cardiology");
        Doctor doctor = new Doctor("John", "Doe", cardiology);
        Patient patient = new Patient("Alice", "Brown", "alice@gmail.com", LocalDate.parse("1990-07-12"));
        Appointment appointment1 = new Appointment(patient, doctor, LocalDate.now(), LocalTime.now(),
                VisitType.IN_PERSON, AppointmentStatus.BOOKED);
        Appointment appointment2 = new Appointment(patient, doctor, LocalDate.now().plusDays(1), LocalTime.now(),
                VisitType.IN_PERSON, AppointmentStatus.CANCELED);

        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));
        when(doctorRepository.findAppointmentsByDoctorIdAndNotBooked(1L))
                .thenReturn(Arrays.asList(appointment1, appointment2));

        Doctor expectedResult = new Doctor("John", "Doe", cardiology);
        expectedResult.setDoctorAppointments(Arrays.asList(appointment1, appointment2));

        // Act
        ResponseEntity<Doctor> response = doctorService.getDoctorById(1L);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(expectedResult, response.getBody());
        verify(doctorRepository, times(1)).findById(1L);
        verify(doctorRepository, times(1)).findAppointmentsByDoctorIdAndNotBooked(1L);
    }

    // * Tests for getListOfDoctorsAndSpecializations method
    // Test case 1: No doctors in the database and no specializations
    @Test
    void testGetListOfDoctorsAndSpecializations_NoDoctorsNoSpecializations() {
        // Arrange
        when(specializationRepository.findAll()).thenReturn(Collections.emptyList());
        when(doctorRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<DoctorSpecializationListResponse> response = doctorService.getListOfDoctorsAndSpecializations();

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody().getSpecializations().isEmpty());
        assertTrue(response.getBody().getDoctors().isEmpty());

        verify(specializationRepository, times(1)).findAll();
        verify(doctorRepository, times(1)).findAll();
    }

    // Test case 2: Doctors exist in the database but no specializations
    @Test
    void testGetListOfDoctorsAndSpecializations_DoctorsExistNoSpecializations() {
        // Arrange
        List<Doctor> mockDoctors = Arrays.asList(
                new Doctor("John", "Doe", new Specialization(1L, "Cardiology")),
                new Doctor("Jane", "Doe", new Specialization(2L, "Neurology")));

        when(specializationRepository.findAll()).thenReturn(Collections.emptyList());
        when(doctorRepository.findAll()).thenReturn(mockDoctors);

        List<DoctorDTO> mockDoctorDTOs = mockDoctors.stream().map(DoctorMapper::toDoctorDTO).toList();

        // Act
        ResponseEntity<DoctorSpecializationListResponse> response = doctorService.getListOfDoctorsAndSpecializations();

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody().getSpecializations().isEmpty());

        verify(specializationRepository, times(1)).findAll();
        verify(doctorRepository, times(1)).findAll();
    }

    // Test case 3: Doctors exist in the database and specializations exist
    @Test
    void testGetListOfDoctorsAndSpecializations_NoDoctorsSpecializationsExist() {
        // Arrange
        List<Specialization> mockSpecializations = Arrays.asList(
                new Specialization("Cardiology"),
                new Specialization("Neurology"));

        when(specializationRepository.findAll()).thenReturn(mockSpecializations);
        when(doctorRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        ResponseEntity<DoctorSpecializationListResponse> response = doctorService.getListOfDoctorsAndSpecializations();

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(mockSpecializations, response.getBody().getSpecializations());
        // assertEquals(mockDoctorDTOs, response.getBody().getDoctors());

        verify(specializationRepository, times(1)).findAll();
        verify(doctorRepository, times(1)).findAll();
    }

    // Test case 4: Doctors and specializations exist in the database
    @Test
    void testGetListOfDoctorsAndSpecializations_DoctorsAndSpecializationsExist() {
        // Arrange
        List<Specialization> mockSpecializations = Arrays.asList(
                new Specialization("Cardiology"),
                new Specialization("Neurology"));
        List<Doctor> mockDoctors = Arrays.asList(
                new Doctor("John", "Doe", new Specialization("Cardiology")),
                new Doctor("Jane", "Doe", new Specialization("Neurology")));

        when(specializationRepository.findAll()).thenReturn(mockSpecializations);
        when(doctorRepository.findAll()).thenReturn(mockDoctors);

        List<DoctorDTO> mockDoctorDTOs = mockDoctors.stream().map(DoctorMapper::toDoctorDTO).toList();

        // Act
        ResponseEntity<DoctorSpecializationListResponse> response = doctorService.getListOfDoctorsAndSpecializations();

        // Assert
        assertNotNull(response);
        assertNotNull(response.getBody());
        assertEquals(200, response.getStatusCode().value());
        assertEquals(mockSpecializations, response.getBody().getSpecializations());
        assertThat(response.getBody().getDoctors()).hasSize(2);
        assertThat(response.getBody().getDoctors()).usingRecursiveFieldByFieldElementComparator()
                .isEqualTo(mockDoctorDTOs);

        verify(specializationRepository, times(1)).findAll();
        verify(doctorRepository, times(1)).findAll();
    }

    // * Tests for updateDoctor method
    @Test
    void testUpdateDoctor_NotFound() {
        DoctorDTO doctorUpdateRequest = new DoctorDTO(1L, "John", "Doe", new Specialization(1L, "Cardiology"));

        when(doctorRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<String> response = doctorService.updateDoctor(doctorUpdateRequest);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Couldn't find Doctor with id 1 in the Database", response.getBody());

    }

    @Test
    void testUpdateDoctor_NoChangesNeeded() {
        DoctorDTO doctorUpdateRequest = new DoctorDTO(1L, "John", "Doe", new Specialization(1L, "Cardiology"));
        Doctor existingDoctor = new Doctor("John", "Doe", new Specialization(1L, "Cardiology"));
        existingDoctor.setId(1L);

        when(doctorRepository.findById(1L)).thenReturn(Optional.of(existingDoctor));

        ResponseEntity<String> response = doctorService.updateDoctor(doctorUpdateRequest);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Nothing to Change! Doctor is the same as the one in the Database", response.getBody());
    }

    @Test
    void testUpdateDoctor_MultipleFieldsUpdated() {
        DoctorDTO doctorUpdateRequest = new DoctorDTO(1L, "Jane", "Smith", new Specialization(2L, "Dermatology"));
        Doctor existingDoctor = new Doctor("John", "Doe", new Specialization(1L, "Cardiology"));
        existingDoctor.setId(1L);

        when(doctorRepository.findById(1L)).thenReturn(Optional.of(existingDoctor));

        ResponseEntity<String> response = doctorService.updateDoctor(doctorUpdateRequest);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Doctor Updated!", response.getBody());
        assertEquals("Jane", existingDoctor.getFirstName());
        assertEquals("Smith", existingDoctor.getLastName());
        assertEquals("Dermatology", existingDoctor.getSpecialization().getName());
    }
}
