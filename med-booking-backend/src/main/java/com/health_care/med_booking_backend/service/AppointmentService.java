package com.health_care.med_booking_backend.service;

import com.health_care.med_booking_backend.dto.AppointmentRequestDTO;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public ResponseEntity<String> createNewAppointment(Appointment appointment) {
        // grab patient & doctor entities

        // check that appointment doesn't exist OR IS CANCELED

        // validate appointment conditions (if false return "misssing XX" detail
        // -- date is in the future
        // -- all fields provided (patient, doctor, date & time, visitType, automatically set to BOOKED)
        // -- no more than one appointment per day, per patient



        // if all is well, save appointment to the database!


        return ResponseEntity.ok("Appointment Created!");
    }

    public ResponseEntity<String> updateAppointmentDetails(Appointment appointment) {

        // check that appointment exists

        // check for change to appointment date

        // check for change to appointment doctor & doctor validations

        // check for change to visitType

        // check for change to status


        return ResponseEntity.ok("Appointment Details Updated!");
    }

    public ResponseEntity<String> updateAppointmentStatus(Appointment appointment) {
        return ResponseEntity.ok("Appointment Status Updated!");
    }

}
