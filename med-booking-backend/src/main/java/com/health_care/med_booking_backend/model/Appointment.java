package com.health_care.med_booking_backend.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    @Column(nullable = false)
    private LocalDateTime appointmentDate;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisitType visitType;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus appointmentStatus;

    public Appointment(Patient patient, Doctor doctor, LocalDateTime appointmentDate, VisitType visitType,
            AppointmentStatus appointmentStatus) {
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.visitType = visitType;
        this.appointmentStatus = appointmentStatus;
    }
}
