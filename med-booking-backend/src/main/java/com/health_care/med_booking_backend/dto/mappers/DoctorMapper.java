package com.health_care.med_booking_backend.dto.mappers;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.model.Doctor;

public class DoctorMapper {
    public static DoctorDTO toDoctorDTO(Doctor doctor) {
        return new DoctorDTO(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialization());
    }
}
