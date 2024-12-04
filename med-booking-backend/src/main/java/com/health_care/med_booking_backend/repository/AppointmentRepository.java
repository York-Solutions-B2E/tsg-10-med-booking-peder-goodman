package com.health_care.med_booking_backend.repository;

import com.health_care.med_booking_backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
