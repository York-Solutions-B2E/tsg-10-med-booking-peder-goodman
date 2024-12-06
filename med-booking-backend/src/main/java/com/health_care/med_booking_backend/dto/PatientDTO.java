package com.health_care.med_booking_backend.dto;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatientDTO {
    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;
    private String email;
}
