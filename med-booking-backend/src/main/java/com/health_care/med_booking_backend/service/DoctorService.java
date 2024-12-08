package com.health_care.med_booking_backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.DoctorRequestDTO;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

@Service

public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;

    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository
            ) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
    }

    public ResponseEntity<String> createNewDoctor(DoctorRequestDTO newDoctor) {
        System.out.println("doctor data: " + newDoctor);
        return ResponseEntity.ok("Doctor Created! " + newDoctor.getFirstName());
    }

    public ResponseEntity<String> updateDoctor(Long doctorId) {
        return ResponseEntity.ok("Doctor Updated! Doctor id is: " + doctorId);
    }

    public ResponseEntity<String> deleteDoctor(Long doctorId) {
        return ResponseEntity.ok("Doctor Deleted! Doctor id is: " + doctorId);
    }

    public ResponseEntity<?> getListOfDoctorsAndSpecializations() {
        List<Specialization> specializationList = specializationRepository.findAll();
        List<Doctor> doctorList = doctorRepository.findAll();

        System.out.println("Specializations: " + specializationList);

        return ResponseEntity.ok(doctorList);
    }

}
