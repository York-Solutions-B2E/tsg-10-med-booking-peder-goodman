package com.health_care.med_booking_backend.dto;

import com.health_care.med_booking_backend.model.Specialization;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DoctorDTO {
    private String firstName;
    private String lastName;
    private Long specializationId;
}
