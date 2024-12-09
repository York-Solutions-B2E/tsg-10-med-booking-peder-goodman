package com.health_care.med_booking_backend.dto;

import java.time.LocalDateTime;

import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.model.VisitType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequestDTO {
    private Patient patient;
    private Doctor doctor;
    private LocalDateTime appointmentDate;
    // @JsonFormat(pattern = "yyyy-MM-dd")
    // private LocalDate date;
    // @JsonFormat(pattern = "HH:mm")
    // private LocalTime time;
    private VisitType visitType;
}
