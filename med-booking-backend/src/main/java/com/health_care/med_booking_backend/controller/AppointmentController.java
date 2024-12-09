package com.health_care.med_booking_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.service.AppointmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createNewAppointment(appointment);
    }

    @PutMapping("/update/details")
    public ResponseEntity<String> updateAppointmentDetails(@RequestBody Appointment appointment) {
        return appointmentService.updateAppointmentDetails(appointment);
    }

    @PutMapping("/update/status")
    public ResponseEntity<String> updateAppointmentStatus(@RequestBody Appointment appointment) {
        return appointmentService.updateAppointmentStatus(appointment);
    }
}
