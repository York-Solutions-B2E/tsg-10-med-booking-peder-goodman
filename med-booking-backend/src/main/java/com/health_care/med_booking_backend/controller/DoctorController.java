package com.health_care.med_booking_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.service.DoctorService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/doctors")

public class DoctorController {

    @Autowired
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Add New Doctor
    @PostMapping(path = "/create")
    public ResponseEntity<String> createNewDoctor(@RequestBody DoctorDTO newDoctor) {
        System.out.println("doctor data: " + newDoctor);
        return ResponseEntity.ok("Doctor Created! " + newDoctor.getFirstName());
    }

    // Update Existing Doctor
    @PutMapping(path = "/edit/{doctorId}")
    public ResponseEntity<String> updateDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok("Doctor Updated! Doctor id is: " + doctorId);
    }

    // Delete doctor
    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok("Doctor Deleted! Doctor id is: " + doctorId);
    }

    // Get a list of Doctors and Specializations
    @GetMapping("/doctors-specializations")
    public ResponseEntity<String> getListOfDoctorsAndSpecializations() {
        return ResponseEntity.ok("List of Doctors & Specializations!!");
    }
}
