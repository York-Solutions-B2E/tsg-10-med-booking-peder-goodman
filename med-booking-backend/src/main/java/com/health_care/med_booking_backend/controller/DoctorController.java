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
import com.health_care.med_booking_backend.dto.DoctorRequestDTO;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.responses.DoctorSpecializationListResponse;
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
    public ResponseEntity<String> createNewDoctor(@RequestBody DoctorRequestDTO newDoctor) {
        return doctorService.createNewDoctor(newDoctor);
    }

    // Update Existing Doctor
    @PutMapping(path = "/edit")
    public ResponseEntity<String> updateDoctor(@RequestBody DoctorDTO doctorDTO) {
        return doctorService.updateDoctor(doctorDTO);
    }

    // Delete doctor
    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long doctorId) {
        return doctorService.deleteDoctor(doctorId);
    }

    // Get a list of Doctors and Specializations
    @GetMapping("/doctors-specializations")
    public ResponseEntity<DoctorSpecializationListResponse> getListOfDoctorsAndSpecializations() {
        return doctorService.getListOfDoctorsAndSpecializations();
    }

    @GetMapping("/get/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long doctorId) {
        return doctorService.getDoctorById(doctorId);
    }
}
