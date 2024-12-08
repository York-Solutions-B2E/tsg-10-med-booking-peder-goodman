package com.health_care.med_booking_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.health_care.med_booking_backend.dto.DoctorDTO;
import com.health_care.med_booking_backend.dto.DoctorRequestDTO;
import com.health_care.med_booking_backend.model.Appointment;
import com.health_care.med_booking_backend.model.Doctor;
import com.health_care.med_booking_backend.model.Specialization;
import com.health_care.med_booking_backend.repository.AppointmentRepository;
import com.health_care.med_booking_backend.repository.DoctorRepository;
import com.health_care.med_booking_backend.repository.SpecializationRepository;

import jakarta.transaction.Transactional;

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

    public ResponseEntity<String> createNewDoctor(DoctorRequestDTO doctorRequestDTO) {
        // Check if the doctor already exists

        String firstName = doctorRequestDTO.getFirstName();
        String lastName = doctorRequestDTO.getLastName();
        Specialization specialization = doctorRequestDTO.getSpecialization();

        Optional<Doctor> doesDoctorExist = doctorRepository.findDoctorByFirstNameAndLastName(firstName, lastName);

        if (doesDoctorExist.isPresent()) {
            return ResponseEntity.badRequest().body("Doctor already exists in the Database");
        }

        doctorRepository.save(new Doctor(firstName, lastName, specialization));

        return ResponseEntity.status(201).body("Doctor Created!");
    }

    @Transactional
    public ResponseEntity<String> updateDoctor(DoctorDTO doctorDTO) {

        Long doctorId = doctorDTO.getId();
        String updatedFirstName = doctorDTO.getFirstName();
        String updatedLastName = doctorDTO.getLastName();
        Specialization updatedSpecialization = doctorDTO.getSpecialization();

        Optional<Doctor> doctor = doctorRepository.findById(doctorId);

        // If doctor doesn't exists, send bad request!
        if (doctor.isEmpty()) {
            return ResponseEntity.badRequest().body("Couldn't find Doctor with id " + doctorId + " in the Database");
        }

        Doctor existingDoctor = doctor.get();

        // If doctor is the same as the one in the database, send bad request!
        if (existingDoctor.getFirstName().equals(updatedFirstName)
                && existingDoctor.getLastName().equals(updatedLastName)
                && existingDoctor.getSpecialization().equals(updatedSpecialization)) {
            return ResponseEntity.badRequest().body("Nothing to Change! Doctor is the same as the one in the Database");
        }

        // Change only what's different
        // Update the doctor's first name if it has changed
        if (!existingDoctor.getFirstName().equals(updatedFirstName)) {
            existingDoctor.setFirstName(updatedFirstName);
        }

        // Update the doctor's last name if it has changed
        if (!existingDoctor.getLastName().equals(updatedLastName)) {
            existingDoctor.setLastName(updatedLastName);
        }

        // Update the doctor's specialization if it has changed
        if (!existingDoctor.getSpecialization().equals(updatedSpecialization)) {
            existingDoctor.setSpecialization(updatedSpecialization);
        }

        // return status of the update
        return ResponseEntity.ok("Doctor Updated!");
    }

    public ResponseEntity<String> deleteDoctor(Long doctorId) {
        boolean doesDoctorExists = doctorRepository.existsById(doctorId);

        if (!doesDoctorExists) {
            return ResponseEntity.badRequest().body("Couldn't find Doctor with id " + doctorId + " in the Database");
        }

        doctorRepository.deleteById(doctorId);

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
