package com.health_care.med_booking_backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

@Service

public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;
    private final AppointmentRepository appointmentRepository;

    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository,
            AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public ResponseEntity<String> createNewDoctor(DoctorDTO newDoctor) {
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

    // Get Doctor by ID
    public ResponseEntity<?> getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalStateException("Doctor with id " + doctorId + " does not exist"));

        // Fetch the list of appointments associated with the doctor
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctor);

        doctor.setDoctorAppointments(appointments);

        return ResponseEntity.ok(doctor);

    }

}
