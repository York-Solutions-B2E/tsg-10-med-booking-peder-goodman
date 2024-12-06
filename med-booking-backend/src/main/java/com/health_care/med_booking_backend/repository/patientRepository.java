package com.health_care.med_booking_backend.repository;

import com.health_care.med_booking_backend.model.Patient;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findPatientByEmail(String email);

    Optional<Patient> findPatientByFirstNameAndLastNameAndBirthdate(String firstName, String lastName, LocalDate birthdate);
}
