package com.health_care.med_booking_backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Optional<Appointment> findAppointmentByPatientAndDoctorAndAppointmentDateAndAppointmentTime(
            Patient patient,
            Doctor doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime);

    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.doctor.id = :doctorId AND a.appointmentDate = :appointmentDate AND a.appointmentStatus <> 'CANCELED'")
    List<Appointment> findAppointmentByPatientIdAndDoctorIdAndAppointmentDate(
            @Param("patientId") Long patientId,
            @Param("doctorId") Long doctorId,
            @Param("appointmentDate") LocalDate appointmentDate);

}
