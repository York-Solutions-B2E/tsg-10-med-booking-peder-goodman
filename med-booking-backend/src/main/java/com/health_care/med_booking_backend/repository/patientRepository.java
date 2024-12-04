package com.health_care.med_booking_backend.repository;

import com.health_care.med_booking_backend.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface patientRepository extends JpaRepository<Patient, Long> {
}
