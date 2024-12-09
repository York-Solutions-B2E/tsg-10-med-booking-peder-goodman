package com.health_care.med_booking_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.dto.AppointmentRequestDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/appointments")
public class AppointmentController {

    @PostMapping("/create")
    public ResponseEntity<String> createNewAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        return ResponseEntity.ok("Appointment Created!");
    }

    @PutMapping("/update/details")
    public ResponseEntity<String> updateAppointmentDetails(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        return ResponseEntity.ok("Appointment Details Updated!");
    }

    @PutMapping("/update/status")
    public ResponseEntity<String> updateAppointmentStatus(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        return ResponseEntity.ok("Appointment Status Updated!");
    }
}
