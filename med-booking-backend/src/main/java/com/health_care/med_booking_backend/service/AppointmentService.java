package com.health_care.med_booking_backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.AppointmentDTO;
import com.health_care.med_booking_backend.dto.requests.AppointmentRequest;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.VisitType;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.PatientRepository;

@Service
public class AppointmentService {
    @Autowired
    private final AppointmentRepository appointmentRepository;
    @Autowired
    private final DoctorRepository doctorRepository;
    @Autowired
    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository,
                              PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public ResponseEntity<String> createNewAppointment(AppointmentRequest appointmentRequest) {
        Long requestedDoctorId = appointmentRequest.getDoctor().getId();
        Long requestedPatientId = appointmentRequest.getPatient().getId();
        LocalDate requestedAppointmentDate = appointmentRequest.getAppointmentDate();
        LocalTime requestedAppointmentTime = appointmentRequest.getAppointmentTime();
        VisitType requestedVisitType = appointmentRequest.getVisitType();

        // grab patient & doctor entities
        Optional<Patient> requestedPatient = patientRepository.findById(requestedPatientId);
        Optional<Doctor> requestedDoctor = doctorRepository.findById(requestedDoctorId);

        // If patient or doctor doesn't exist, send bad request!
        if (!requestedDoctor.isPresent() || !requestedPatient.isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Invalid patient or doctor ID!");
        }

        // Check if the appointment exists
        Optional<Appointment> doesAppointmentExist = appointmentRepository
                .findAppointmentByPatientAndDoctorAndAppointmentDateAndAppointmentTime(requestedPatient.get(), requestedDoctor.get(),
                        requestedAppointmentDate, requestedAppointmentTime);

        // If appointment does Exist and *is not* CANCELED, we can't make it, send bad
        // request!
        if (doesAppointmentExist.isPresent()
                && doesAppointmentExist.get().getAppointmentStatus() != AppointmentStatus.CANCELED) {
            return ResponseEntity.badRequest().body("Appointment already Exists!");
        }

        // checks if an appointment with the same patient & doctor exists for the requested appointment date, filters out "CANCELED" appointments
        List<Appointment> existingAppointments = appointmentRepository.findAppointmentByPatientIdAndDoctorIdAndAppointmentDate(requestedPatientId, requestedDoctorId, requestedAppointmentDate);
        if (!existingAppointments.isEmpty()) {
            return ResponseEntity.badRequest().body("This Patient already has an appointment on this day!");
        }

        // Validate date is in the future
        // merge date and time
        LocalDateTime requestedDateTime = LocalDateTime.of(requestedAppointmentDate, requestedAppointmentTime);

        boolean validateDateTimeInFuture = requestedDateTime.isAfter(java.time.LocalDateTime.now());
        if (!validateDateTimeInFuture) {
            return ResponseEntity.badRequest().body("Requested Appointment is not in the future!");
        }
        //
        boolean validateVisitType = appointmentRequest.getVisitType() != null;
        if (!validateVisitType) {
            return ResponseEntity.badRequest().body("Visit Type Required!");
        }

        // create new Appointment, automatically set status to BOOKED)
        Appointment newAppointment = new Appointment(
                requestedPatient.get(),
                requestedDoctor.get(),
                requestedAppointmentDate,
                requestedAppointmentTime,
                requestedVisitType,
                AppointmentStatus.BOOKED);

        // if all is well, save appointment to the database!
        appointmentRepository.save(newAppointment);

        // Return created status + message
        return ResponseEntity.status(201).body("Appointment Created!");
    }

    public ResponseEntity<String> updateAppointmentDetails(AppointmentDTO appointmentDTO) {
        Optional<Appointment> doesAppointmentIdExist = appointmentRepository.findById(appointmentDTO.getId());

        if (doesAppointmentIdExist.isEmpty()) {
            return ResponseEntity.badRequest().body("Appointment doesn't exist!");
        }

        // check that appointment exists

        // check for change to appointment date & date validations

        // check for change to appointment doctor & doctor validations

        // check for change to visitType



        return ResponseEntity.ok("Appointment Details Updated!");
    }



    public ResponseEntity<String> cancelAppointment(Long appointmentId) {
        Optional<Appointment> doesAppointmentIdExist = appointmentRepository.findById(appointmentId);

        if (doesAppointmentIdExist.isEmpty()) {
            return ResponseEntity.badRequest().body("Appointment doesn't exist!");
        }

        Appointment appointment = doesAppointmentIdExist.get();

        // check if appointment is already canceled
        if (appointment.getAppointmentStatus() == AppointmentStatus.CANCELED) {
            return ResponseEntity.badRequest().body("Appointment is already canceled!");
        }

        // check if appointment is in the past
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getAppointmentDate(), appointment.getAppointmentTime());
        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Appointment is in the past!");
        }

        // set appointment status to CANCELED
        appointment.setAppointmentStatus(AppointmentStatus.CANCELED);
        appointmentRepository.save(appointment);

        return ResponseEntity.ok("Appointment Canceled!");
    }


    
}
