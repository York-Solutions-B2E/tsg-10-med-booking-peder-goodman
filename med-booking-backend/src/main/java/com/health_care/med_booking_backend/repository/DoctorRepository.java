package com.health_care.med_booking_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findDoctorByFirstNameAndLastNameAndSpecialization(String firstName, String lastName,
            Specialization specialization);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.appointmentStatus <> 'CANCELED'")
    List<Appointment> findAppointmentsByDoctorIdAndNotBooked(@Param("doctorId") Long doctorId);

}
