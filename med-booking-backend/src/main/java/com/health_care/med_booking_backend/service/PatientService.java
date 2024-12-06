package com.health_care.med_booking_backend.service;

import com.health_care.med_booking_backend.dto.PatientDTO;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Validate patient exists
    public boolean validatePatientExists(PatientDTO patientDTO) {
        // if exists, return true. if they don't exist, return false
        return patientRepository.findPatientByFirstNameAndLastNameAndBirthdate(patientDTO.getFirstName(),
                patientDTO.getLastName(), patientDTO.getBirthdate()).isPresent();
    }

    // Add New Patient
    public ResponseEntity<String> createNewPatient(PatientDTO patientDTO) {

        System.out.println("Patient Received!" + patientDTO.getFirstName());
        System.out.println("Patient Received!" + patientDTO.getBirthdate());

        Optional<Patient> doesPatientEmailExist = patientRepository.findPatientByEmail(patientDTO.getEmail());

        // validate patient exists in the DB
        if (doesPatientEmailExist.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        String firstName = patientDTO.getFirstName();
        String lastName = patientDTO.getLastName();
        String email = patientDTO.getEmail();
        LocalDate birthdate = patientDTO.getBirthdate();

        // Save the new patient to the repository
        Patient newPatient = new Patient(firstName, lastName, email, birthdate);

        patientRepository.save(newPatient);

        return ResponseEntity.ok("Patient Created");

    }

    // GetPatient details
    public Patient getPatientDetails(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalStateException("Patient with id " + patientId + " does not exist"));
    }

    // Get "Login"???
    public Patient loginPatient(PatientDTO patientEmailAndBirthdate) {

        Optional<Patient> doesPatientEmailExist = patientRepository
                .findPatientByEmail(patientEmailAndBirthdate.getEmail());

        // validate patient exists in the DB
        if (doesPatientEmailExist.isEmpty()) {
            throw new IllegalStateException("User Doesn't exists");
        }

        System.out.println("submitted Birthdate: " + patientEmailAndBirthdate.getBirthdate());
        System.out.println("submitted Birthdate: " + doesPatientEmailExist.get().getBirthdate());

        // Validate correct login info (email and DOB)
        // if
        // (doesPatientEmailExist.get().getEmail().equals(patientEmailAndBirthdate.getEmail())
        // && doesPatientEmailExist.get().getBirthdate() !=
        // patientEmailAndBirthdate.getBirthdate()) {
        // throw new IllegalStateException("Login Info doesn't match");
        // }

        // return the patient if all checks out
        return doesPatientEmailExist.get();
    }
}
