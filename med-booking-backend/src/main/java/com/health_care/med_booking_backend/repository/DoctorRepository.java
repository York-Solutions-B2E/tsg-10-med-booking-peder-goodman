package com.health_care.med_booking_backend.repository;

import com.health_care.med_booking_backend.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
