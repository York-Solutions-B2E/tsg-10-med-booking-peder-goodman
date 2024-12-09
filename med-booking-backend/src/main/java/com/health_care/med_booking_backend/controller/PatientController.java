package com.health_care.med_booking_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.dto.requests.PatientRequest;
import com.health_care.med_booking_backend.model.Patient;
import com.health_care.med_booking_backend.service.PatientService;

/*
This controller is effectively public!
User's "login" by giving their email and dob
*/
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // validate new user exists
    @GetMapping(path = "/validate")
    public Boolean validatePatientExists(PatientRequest patientRequest) {
        return patientService.validatePatientExists(patientRequest);
    }

    // Add New Patient
    @PostMapping(path = "/create")
    public ResponseEntity<String> createNewPatient(@RequestBody PatientRequest newPatientRequest) {
        return patientService.createNewPatient(newPatientRequest);
    }

    // Get "Login"???
    @PostMapping(path = "/login")
    public Patient loginPatient(@RequestBody PatientRequest patientRequest) {
        return patientService.loginPatient(patientRequest); // returns patient with list of appointments
    }

    // GetPatient details
    @GetMapping(path = "/details/{patientId}")
    public Patient getPatientDetails(@PathVariable Long patientId) {
        return patientService.getPatientDetails(patientId); // returns patient with list of appointments
    }

}