package com.health_care.med_booking_backend.service.serviceUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import com.health_care.med_booking_backend.repository.DoctorRepository;

@Service
public class AppointmentValidations {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentValidations(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    // Check if the doctor exists
    public boolean isDoctorValid(Long doctorId) {
        Optional<Doctor> requestedDoctor = doctorRepository.findById(doctorId);
        return requestedDoctor.isPresent();
    }

    // Check if the patient and doctor have an appointment on the same date
    public List<Appointment> isPatientDoctorAppointmentDateValid(Long patientId, Long doctorId,
            LocalDate appointmentDate) {
        List<Appointment> existingAppointments = appointmentRepository
                .findAppointmentByPatientIdAndDoctorIdAndAppointmentDate(patientId, doctorId, appointmentDate);

        return existingAppointments;
    }

    public Optional<Appointment> isDoctorAvailable(Long doctorId, LocalDate appointmentDate,
            LocalTime appointmentTime) {
        Optional<Appointment> isDoctorAvailable = appointmentRepository
                .findAppointmentByDoctorIdAndAppointmentDateAndAppointmentTime(doctorId, appointmentDate,
                        appointmentTime);

        return isDoctorAvailable;
    }

    public boolean isDateTimeInTheFuture(LocalDate appointmentDate, LocalTime appointmentTime) {
        return LocalDateTime.of(appointmentDate, appointmentTime).isAfter(LocalDateTime.now());
    }
}
