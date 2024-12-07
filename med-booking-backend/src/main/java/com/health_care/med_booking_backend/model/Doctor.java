package com.health_care.med_booking_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @OneToMany(mappedBy = "doctor")
    @JsonManagedReference
    private List<Appointment> doctorAppointments;

    public Doctor(String firstName, String lastName, Specialization specialization,
            List<Appointment> doctorAppointments) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.doctorAppointments = doctorAppointments;
    }

    public Doctor(String firstName, String lastName, Specialization specialization) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
    }
}
