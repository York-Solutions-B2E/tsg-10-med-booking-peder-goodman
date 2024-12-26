package com.health_care.med_booking_backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DoctorStatus doctorStatus;

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @OneToMany(mappedBy = "doctor")
    @JsonManagedReference
    @JsonIgnoreProperties("doctor")
    private List<Appointment> doctorAppointments;

    // ? This constructor isn't used! the one with 3 parameters is used instead.
    // ? Testing pointed out that I could remove this constructor.
    public Doctor(String firstName, String lastName, Specialization specialization) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.doctorStatus = DoctorStatus.ACTIVE; // Default to ACTIVE
    }

    public Doctor(String firstName, String lastName, Specialization specialization, DoctorStatus doctorStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.doctorStatus = doctorStatus;
    }
}
