package com.health_care.med_booking_backend.responses;

import java.util.List;

import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorSpecializationListResponse {
    private List<Specialization> specializations;
    private List<Doctor> doctors;
}
