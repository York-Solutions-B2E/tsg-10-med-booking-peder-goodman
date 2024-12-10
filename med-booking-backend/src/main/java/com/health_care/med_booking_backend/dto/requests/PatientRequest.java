package com.health_care.med_booking_backend.dto.requests;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatientRequest {
    private String firstName;
    private String lastName;
    private LocalDate birthdate;
    private String email;
}
