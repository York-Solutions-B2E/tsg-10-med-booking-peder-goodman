package com.health_care.med_booking_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate birthdate;
    private String email;
}
