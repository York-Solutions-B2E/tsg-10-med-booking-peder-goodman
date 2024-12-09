package com.health_care.med_booking_backend.dto;

import java.time.LocalDateTime;

import com.health_care.med_booking_backend.model.AppointmentStatus;
import com.health_care.med_booking_backend.model.VisitType;

import lombok.Data;

@Data
public class AppointmentDTO {
    private Long id;
    private PatientDTO patient;
    private DoctorDTO doctor;
    private LocalDateTime appointmentDate;
    // @JsonFormat(pattern = "yyyy-MM-dd")
    // private LocalDate date;
    // @JsonFormat(pattern = "HH:mm")
    // private LocalTime time;
    private VisitType visitType;
    private AppointmentStatus appointmentStatus;
}