package com.health_care.med_booking_backend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.AppointmentDTO;
import com.health_care.med_booking_backend.dto.AppointmentRequestDTO;
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

    public ResponseEntity<String> createNewAppointment(AppointmentRequestDTO appointmentRequestDTO) {
        // Doctor requestedDoctor = appointmentRequestDTO.getDoctor();
        // Patient requestedPatient = appointmentRequestDTO.getPatient();

        Long requestedDoctorId = appointmentRequestDTO.getDoctor().getId();
        Long requestedPatientId = appointmentRequestDTO.getPatient().getId();
        LocalDateTime requestedAppointmentDate = appointmentRequestDTO.getAppointmentDate();
        VisitType requestedVisitType = appointmentRequestDTO.getVisitType();

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
                .findAppointmentByPatientAndDoctorAndAppointmentDate(requestedPatient.get(), requestedDoctor.get(),
                        requestedAppointmentDate);

        // If appointment does Exist and *is not* CANCELED, we can't make it, send bad
        // request!
        if (doesAppointmentExist.isPresent()
                && doesAppointmentExist.get().getAppointmentStatus() != AppointmentStatus.CANCELED) {
            return ResponseEntity.badRequest().body("Appointment already Exists!");
        }

        // Validate Appointment Date and patient and doctor do not have another
        // appointment on the same day
        // ????????

        // Validate date is in the future
        boolean validateDateTimeInFuture = appointmentRequestDTO.getAppointmentDate()
                .isAfter(java.time.LocalDateTime.now());
        if (!validateDateTimeInFuture) {
            return ResponseEntity.badRequest().body("Requested Appointment is not in the future!");
        }
        //
        boolean validateVisitType = appointmentRequestDTO.getVisitType() != null;
        if (!validateVisitType) {
            return ResponseEntity.badRequest().body("Visit Type Required!");
        }

        // create new Appointment, automatically set status to BOOKED)
        Appointment newAppointment = new Appointment(
                requestedPatient.get(),
                requestedDoctor.get(),
                requestedAppointmentDate,
                requestedVisitType,
                AppointmentStatus.BOOKED);

        // if all is well, save appointment to the database!
        appointmentRepository.save(newAppointment);

        // Return created status + message
        return ResponseEntity.status(201).body("Appointment Created!");
    }

    public ResponseEntity<String> updateAppointmentDetails(AppointmentDTO appointmentDTO) {
        Optional<Appointment> doesAppointmentIdExist = appointmentRepository.findById(appointmentDTO.getId());

        System.out.println("Appointment exists = " + doesAppointmentIdExist.isPresent());
        // check that appointment exists

        // check for change to appointment date

        // check for change to appointment doctor & doctor validations

        // check for change to visitType

        // check for change to status

        return ResponseEntity.ok("Appointment Details Updated!");
    }

}
