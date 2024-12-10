package com.health_care.med_booking_backend.dto.requests;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.dto.PatientDTO;
import com.health_care.med_booking_backend.model.VisitType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    private PatientDTO patient;
    private DoctorDTO doctor;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate appointmentDate;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime appointmentTime;
    private VisitType visitType;
}
