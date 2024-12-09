package com.health_care.med_booking_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.dto.requests.DoctorRequest;
import com.health_care.med_booking_backend.dto.mappers.DoctorMapper;
import com.health_care.med_booking_backend.dto.responses.DoctorSpecializationListResponse;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

import jakarta.transaction.Transactional;

@Service

public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;

    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
    }

    public ResponseEntity<String> createNewDoctor(DoctorRequest doctorRequest) {
        // Check if the doctor already exists

        String firstName = doctorRequest.getFirstName();
        String lastName = doctorRequest.getLastName();
        Specialization specialization = doctorRequest.getSpecialization();

        Optional<Doctor> doesDoctorExist = doctorRepository.findDoctorByFirstNameAndLastNameAndSpecialization(firstName,
                lastName, specialization);

        if (doesDoctorExist.isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Doctor already exists in the Database with the same name and specialization");
        }

        doctorRepository.save(new Doctor(firstName, lastName, specialization));

        return ResponseEntity.status(201).body("Doctor Created!");
    }

    @Transactional
    public ResponseEntity<String> updateDoctor(DoctorDTO doctorDTO) {

        Long doctorId = doctorDTO.getId();
        String updatedFirstName = doctorDTO.getFirstName();
        String updatedLastName = doctorDTO.getLastName();
        Specialization updatedSpecialization = doctorDTO.getSpecialization();

        Optional<Doctor> doctor = doctorRepository.findById(doctorId);

        // If doctor doesn't exists, send bad request!
        if (doctor.isEmpty()) {
            return ResponseEntity.badRequest().body("Couldn't find Doctor with id " + doctorId + " in the Database");
        }

        Doctor existingDoctor = doctor.get();

        // If doctor is the same as the one in the database, send bad request!
        if (existingDoctor.getFirstName().equals(updatedFirstName)
                && existingDoctor.getLastName().equals(updatedLastName)
                && existingDoctor.getSpecialization().equals(updatedSpecialization)) {
            return ResponseEntity.badRequest().body("Nothing to Change! Doctor is the same as the one in the Database");
        }

        // Change only what's different
        // Update the doctor's first name if it has changed
        if (!existingDoctor.getFirstName().equals(updatedFirstName)) {
            existingDoctor.setFirstName(updatedFirstName);
        }

        // Update the doctor's last name if it has changed
        if (!existingDoctor.getLastName().equals(updatedLastName)) {
            existingDoctor.setLastName(updatedLastName);
        }

        // Update the doctor's specialization if it has changed
        if (!existingDoctor.getSpecialization().equals(updatedSpecialization)) {
            existingDoctor.setSpecialization(updatedSpecialization);
        }

        // return status of the update
        return ResponseEntity.ok("Doctor Updated!");
    }

    public ResponseEntity<String> deleteDoctor(Long doctorId) {
        boolean doesDoctorExists = doctorRepository.existsById(doctorId);

        if (!doesDoctorExists) {
            return ResponseEntity.badRequest().body("Couldn't find Doctor with id " + doctorId + " in the Database");
        }

        doctorRepository.deleteById(doctorId);

        return ResponseEntity.ok("Doctor Deleted! Doctor id is: " + doctorId);
    }

    public ResponseEntity<DoctorSpecializationListResponse> getListOfDoctorsAndSpecializations() {
        List<Specialization> specializationList = specializationRepository.findAll();
        List<Doctor> doctorList = doctorRepository.findAll();

        List<DoctorDTO> doctorDTOList = doctorList.stream().map(DoctorMapper::toDoctorDTO).toList();

        DoctorSpecializationListResponse doctorSpecializationListResponse = new DoctorSpecializationListResponse(
                specializationList, doctorDTOList);

        return ResponseEntity.ok(doctorSpecializationListResponse);
    }

    // Get Doctor by ID
    public ResponseEntity<Doctor> getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalStateException("Doctor with id " + doctorId + " does not exist"));

        return ResponseEntity.ok(doctor);
    }

}
