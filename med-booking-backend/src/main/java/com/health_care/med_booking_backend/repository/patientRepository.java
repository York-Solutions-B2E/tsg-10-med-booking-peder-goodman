package com.health_care.med_booking_backend.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.health_care.med_booking_backend.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findPatientByEmail(String email);

    Optional<Patient> findPatientByFirstNameAndLastNameAndBirthdate(String firstName, String lastName,
            LocalDate birthdate);
}
