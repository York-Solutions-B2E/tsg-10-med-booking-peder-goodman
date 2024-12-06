package com.health_care.med_booking_backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.repository.DoctorRepository;

@Service

public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public ResponseEntity<String> createNewDoctor(DoctorDTO newDoctor) {
        System.out.println("doctor data: " + newDoctor);
        return ResponseEntity.ok("Doctor Created! " + newDoctor.getFirstName());
    }

    @PutMapping(path = "/edit/{doctorId}")
    public ResponseEntity<String> updateDoctor(Long doctorId) {
        return ResponseEntity.ok("Doctor Updated! Doctor id is: " + doctorId);
    }

    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<String> deleteDoctor(Long doctorId) {
        return ResponseEntity.ok("Doctor Deleted! Doctor id is: " + doctorId);
    }

    @GetMapping("/doctors-specializations")
    public ResponseEntity<String> getListOfDoctorsAndSpecializations() {
        return ResponseEntity.ok("List of Doctors & Specializations!!");
    }

}
