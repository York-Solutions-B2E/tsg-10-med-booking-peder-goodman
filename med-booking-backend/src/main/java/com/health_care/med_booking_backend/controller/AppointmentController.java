package com.health_care.med_booking_backend.controller;

import com.health_care.med_booking_backend.dto.AppointmentRequestDTO;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createNewAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        return appointmentService.createNewAppointment(appointmentRequestDTO);
    }

    @PutMapping("/update/details")
    public ResponseEntity<String> updateAppointmentDetails(@RequestBody Appointment appointment) {
        return appointmentService.updateAppointmentDetails(appointment);
    }
}
