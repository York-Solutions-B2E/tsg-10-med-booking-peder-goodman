package com.health_care.med_booking_backend.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.dto.mappers.DoctorMapper;
import com.health_care.med_booking_backend.dto.requests.DoctorRequest;
import com.health_care.med_booking_backend.dto.responses.DoctorSpecializationListResponse;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.service.DoctorService;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class DoctorControllerTest {

    @Mock
    private DoctorService doctorService;

    private DoctorController doctorController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        doctorController = new DoctorController(doctorService);

    }

    // * Test create new Doctor
    @Test
    void testCreateNewDoctor_Success() throws Exception {
        DoctorRequest doctorRequest = new DoctorRequest("John", "Doe", new Specialization(1L, "Cardiology"));

        when(doctorService.createNewDoctor(doctorRequest))
                .thenReturn(ResponseEntity.status(201).body("Doctor Created!"));

        ResponseEntity<String> response = doctorController.createNewDoctor(doctorRequest);

        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Doctor Created!", response.getBody());
    }

    @Test
    void testCreateNewDoctor_returnsAlreadyExists() throws Exception {
        DoctorRequest doctorRequest = new DoctorRequest("John", "Doe", new Specialization(1L, "Cardiology"));

        when(doctorService.createNewDoctor(doctorRequest))
                .thenReturn(ResponseEntity.status(400)
                        .body("Doctor already exists in the Database with the same name and specialization!"));

        ResponseEntity<String> response = doctorService.createNewDoctor(doctorRequest);

        assertNotNull(response);
        assertEquals(400, response.getStatusCode().value());
        assertEquals("Doctor already exists in the Database with the same name and specialization!",
                response.getBody());
    }

    // * Test update Doctor
    @Test
    void testUpdateDoctor_NotFound() {
        DoctorDTO doctorRequest = new DoctorDTO(1L, "Jane", "Smith", new Specialization(1L, "Orthopedics"));

        when(doctorService.updateDoctor(doctorRequest))
                .thenReturn(ResponseEntity.status(400)
                        .body("Couldn't find Doctor with id 1 in the Database"));

        ResponseEntity<String> response = doctorController.updateDoctor(doctorRequest);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Couldn't find Doctor with id 1 in the Database", response.getBody());
    }

    @Test
    void testUpdateDoctor_NoChangesNeeded() {
        DoctorDTO doctorRequest = new DoctorDTO(1L, "Jane", "Smith", new Specialization(1L, "Orthopedics"));

        when(doctorService.updateDoctor(doctorRequest))
                .thenReturn(ResponseEntity.status(400)
                        .body("Nothing to Change! Doctor is the same as the one in the Database"));

        ResponseEntity<String> response = doctorController.updateDoctor(doctorRequest);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Nothing to Change! Doctor is the same as the one in the Database", response.getBody());
    }

    @Test
    void testUpdateDoctor_MultipleFieldsUpdated() {
        DoctorDTO doctorRequest = new DoctorDTO(1L, "Jane", "Smith", new Specialization(1L, "Orthopedics"));

        when(doctorService.updateDoctor(doctorRequest))
                .thenReturn(ResponseEntity.status(200)
                        .body("Doctor Updated!"));

        ResponseEntity<String> response = doctorController.updateDoctor(doctorRequest);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Doctor Updated!", response.getBody());
    }

    // * Test delete Doctor
    @Test
    void deleteDoctor_NotFound() {
        when(doctorService.deleteDoctor(1L))
                .thenReturn(ResponseEntity.status(400).body("Couldn't find Doctor with id 1 in the Database"));

        ResponseEntity<String> response = doctorController.deleteDoctor(1L);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Couldn't find Doctor with id 1 in the Database", response.getBody());
    }

    @Test
    void testDeleteDoctor_doctorExists() {
        when(doctorService.deleteDoctor(1L))
                .thenReturn(ResponseEntity.status(200).body("Doctor Deleted! Doctor id is: 1"));

        ResponseEntity<String> response = doctorController.deleteDoctor(1L);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Doctor Deleted! Doctor id is: 1", response.getBody());
    }

    // * Test get list of Doctors and Specializations
    @Test
    void testGetListOfDoctorsAndSpecializations_DoctorsAndSpecializationsExist() {
        // Arrange
        Doctor doctor1 = new Doctor("John", "Doe", new Specialization(1L, "Cardiology"));
        Doctor doctor2 = new Doctor("Jane", "Smith", new Specialization(1L, "Orthopedics"));
        Specialization specialization1 = new Specialization(1L, "Cardiology");
        Specialization specialization2 = new Specialization(2L, "Orthopedics");

        List<Specialization> specializationList = List.of(specialization1, specialization2);
        List<Doctor> doctorList = List.of(doctor1, doctor2);

        List<DoctorDTO> doctorDTOList = doctorList.stream().map(DoctorMapper::toDoctorDTO).toList();

        // list of doctors and specializations

        when(doctorService.getListOfDoctorsAndSpecializations()).thenReturn(
                ResponseEntity.ok().body(new DoctorSpecializationListResponse(specializationList, doctorDTOList)));

        ResponseEntity<DoctorSpecializationListResponse> response = doctorController
                .getListOfDoctorsAndSpecializations();

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(specializationList, response.getBody().getSpecializations());
        assertEquals(doctorDTOList, response.getBody().getDoctors());
    }

    @Test
    void testGetListOfDoctorsAndSpecializations_NoDoctorsNoSpecializations() {
        // Arrange
        List<Specialization> specializationList = List.of();

        List<DoctorDTO> doctorDTOList = List.of();

        // list of doctors and specializations

        when(doctorService.getListOfDoctorsAndSpecializations()).thenReturn(
                ResponseEntity.ok().body(new DoctorSpecializationListResponse(specializationList, doctorDTOList)));

        ResponseEntity<DoctorSpecializationListResponse> response = doctorController
                .getListOfDoctorsAndSpecializations();

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(specializationList, response.getBody().getSpecializations());
        assertEquals(doctorDTOList, response.getBody().getDoctors());
    }

    // * Test get Doctor by Id
    @Test
    @Disabled
    void testGetDoctorById_NotFound() {
        fail("Not yet implemented");
    }

    @Test
    @Disabled
    void testGetDoctorById_Found() {
        fail("Not yet implemented");
    }
}