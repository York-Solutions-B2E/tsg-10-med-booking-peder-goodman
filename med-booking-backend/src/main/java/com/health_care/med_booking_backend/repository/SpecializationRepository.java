package com.health_care.med_booking_backend.repository;

import com.health_care.med_booking_backend.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
}
