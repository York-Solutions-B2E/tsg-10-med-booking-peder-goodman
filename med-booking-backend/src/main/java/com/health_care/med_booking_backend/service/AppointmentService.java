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
import com.health_care.med_booking_backend.service.serviceUtils.AppointmentValidations;

import jakarta.transaction.Transactional;

@Service
public class AppointmentService {
    @Autowired
    private final AppointmentRepository appointmentRepository;
    @Autowired
    private final DoctorRepository doctorRepository;
    @Autowired
    private final PatientRepository patientRepository;
    private final AppointmentValidations appointmentValidations;

    public AppointmentService(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository,
            PatientRepository patientRepository, AppointmentValidations appointmentValidations) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentValidations = appointmentValidations;
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
        if (requestedDoctor.isEmpty() || requestedPatient.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Invalid patient or doctor ID!");
        }

        // Check if the appointment exists
        Optional<Appointment> doesAppointmentExist = appointmentRepository
                .findAppointmentByPatientAndDoctorAndAppointmentDateAndAppointmentTime(requestedPatient.get(),
                        requestedDoctor.get(),
                        requestedAppointmentDate, requestedAppointmentTime);

        // If appointment does Exist and *is not* CANCELED, we can't make it, send bad
        // request!
        if (doesAppointmentExist.isPresent()
                && doesAppointmentExist.get().getAppointmentStatus() != AppointmentStatus.CANCELED) {
            return ResponseEntity.badRequest().body("Appointment already Exists!");
        }

        // checks if an appointment with the same patient & doctor exists for the
        // requested appointment date, filters out "CANCELED" appointments
        List<Appointment> existingAppointments = appointmentRepository
                .findAppointmentByPatientIdAndDoctorIdAndAppointmentDate(requestedPatientId, requestedDoctorId,
                        requestedAppointmentDate);
        if (!existingAppointments.isEmpty()) {
            return ResponseEntity.badRequest().body("This Patient already has an appointment on this day!");
        }

        // check if doctor is available on the requested date & time
        Optional<Appointment> isDoctorAvailableOnRequestedDateTime = appointmentValidations
                .isDoctorAvailable(requestedDoctorId, requestedAppointmentDate, requestedAppointmentTime);
        if (isDoctorAvailableOnRequestedDateTime.isPresent()) {
            return ResponseEntity.badRequest().body("Doctor is not available on the requested date & time!");
        }

        // Validate date is in the future
        // merge date and time
        boolean validateDateTimeInFuture = LocalDateTime.of(requestedAppointmentDate, requestedAppointmentTime)
                .isAfter(LocalDateTime.now());
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

    @Transactional
    public ResponseEntity<String> updateAppointmentDetails(AppointmentDTO updatedAppointment) {
        // Updated Appointment details
        Long updatedAppointmentId = updatedAppointment.getId();
        Long updatedDoctorId = updatedAppointment.getDoctor().getId();
        Long updatedPatientId = updatedAppointment.getPatient().getId();
        LocalDate updatedAppointmentDate = updatedAppointment.getAppointmentDate();
        LocalTime updatedAppointmentTime = updatedAppointment.getAppointmentTime();
        VisitType updatedVisitType = updatedAppointment.getVisitType();

        // check if appointment exists
        Optional<Appointment> existingAppointmentOptional = appointmentRepository.findById(updatedAppointmentId);
        // check that appointment exists
        if (existingAppointmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Appointment doesn't exist!");
        }
        Appointment existingAppointment = existingAppointmentOptional.get();

        // Existing Appointment details
        Long existingDoctorId = existingAppointment.getDoctor().getId();
        LocalDate existingAppointmentDate = existingAppointment.getAppointmentDate();
        LocalTime existingAppointmentTime = existingAppointment.getAppointmentTime();
        VisitType existingVisitType = existingAppointment.getVisitType();

        // check what has changed
        boolean hasDoctorChanged = !existingDoctorId.equals(updatedDoctorId); // true if doctor has changed
        boolean hasDateChanged = !existingAppointmentDate.equals(updatedAppointmentDate); // true if date has changed
        boolean hasTimeChanged = !existingAppointmentTime.equals(updatedAppointmentTime); // true if time has changed
        boolean hasVisitTypeChanged = !existingVisitType.equals(updatedVisitType); // true if visit type has changed

        System.out.println("Doctor Changed: " + hasDoctorChanged);
        System.out.println("Date Changed: " + hasDateChanged);
        System.out.println("Time Changed: " + hasTimeChanged);
        System.out.println("Visit Type Changed: " + hasVisitTypeChanged);

        // if nothing has changed, return bad request
        if (!hasDoctorChanged && !hasDateChanged && !hasTimeChanged && !hasVisitTypeChanged) {
            return ResponseEntity.badRequest()
                    .body("Nothing to Change! Appointment is the same as the one in the Database");
        }

        // check for change to appointment date & date validations
        if (!appointmentValidations.isDateTimeInTheFuture(updatedAppointmentDate,
                updatedAppointmentTime)) {
            return ResponseEntity.badRequest().body("Requested Appointment is not in the future!");
        }

        // check if doctor exists, if doctor has changed
        Optional<Doctor> existingDoctorOptional = doctorRepository.findById(updatedDoctorId);

        if (existingDoctorOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor doesn't exist!");
        }

        // If doctor, date, or time has changed, validate & update new details
        if (hasDoctorChanged || hasDateChanged || hasTimeChanged) {

            if (hasDateChanged || hasTimeChanged) {
                // check if doctor is available on the requested date & time
                Optional<Appointment> isDoctorAvailableOnRequestedDateTime = appointmentValidations
                        .isDoctorAvailable(updatedDoctorId, updatedAppointmentDate, updatedAppointmentTime)
                        .filter(appointment -> !appointment.getId().equals(updatedAppointmentId));

                if (isDoctorAvailableOnRequestedDateTime.isPresent()) {
                    return ResponseEntity.badRequest().body("Doctor is not available on the requested date & time!");
                }
            }

            // checks if Patient/Doctor/AppointmentDate is valid. filters out updated
            // appointment
            List<Appointment> overlappingDoctorPatientAppointments = appointmentValidations
                    .isPatientDoctorAppointmentDateValid(updatedPatientId, updatedDoctorId,
                            updatedAppointmentDate)
                    .stream()
                    .filter(appointment -> !appointment.getId().equals(updatedAppointmentId))
                    .toList();

            // if an appointment exists on that day, return bad request
            if (!overlappingDoctorPatientAppointments.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("This Patient already has an appointment on this day with this Doctor!");
            }

            // update doctor & Date & Time
            existingAppointment.setDoctor(existingDoctorOptional.get());
            existingAppointment.setAppointmentDate(updatedAppointmentDate);
            existingAppointment.setAppointmentTime(updatedAppointmentTime);
        }

        // check for change to visitType
        if (updatedVisitType != null && updatedVisitType != existingVisitType) {
            System.out.println("Visit Type Updated!");
            existingAppointment.setVisitType(updatedVisitType);
        }

        return ResponseEntity.ok("Appointment Details Updated!");
    }

    @Transactional
    public ResponseEntity<String> cancelAppointment(Long appointmentId) {
        Optional<Appointment> doesAppointmentExist = appointmentRepository.findById(appointmentId);

        if (doesAppointmentExist.isEmpty()) {
            return ResponseEntity.badRequest().body("Appointment doesn't exist!");
        }

        Appointment appointment = doesAppointmentExist.get();

        // check if appointment is already canceled
        if (appointment.getAppointmentStatus() == AppointmentStatus.CANCELED) {
            return ResponseEntity.badRequest().body("Appointment is already canceled!");
        }

        // check if appointment is in the past
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getAppointmentDate(),
                appointment.getAppointmentTime());
        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Appointment is in the past!");
        }

        // set appointment status to CANCELED
        appointment.setAppointmentStatus(AppointmentStatus.CANCELED);

        return ResponseEntity.ok("Appointment Canceled!");
    }

}
