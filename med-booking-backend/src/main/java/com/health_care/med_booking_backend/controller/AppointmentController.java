package com.health_care.med_booking_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.dto.AppointmentDTO;
import com.health_care.med_booking_backend.dto.requests.AppointmentRequest;
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
    public ResponseEntity<String> createNewAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        return appointmentService.createNewAppointment(appointmentRequest);
    }

    @PutMapping("/update/details")
    public ResponseEntity<String> updateAppointmentDetails(@RequestBody AppointmentDTO appointmentDTO) {
        return appointmentService.updateAppointmentDetails(appointmentDTO);
    }

    @PutMapping("/cancel")
    public ResponseEntity<String> cancelAppointment(@RequestBody Long appointmentId) {
        return appointmentService.cancelAppointment(appointmentId);
    }
}
