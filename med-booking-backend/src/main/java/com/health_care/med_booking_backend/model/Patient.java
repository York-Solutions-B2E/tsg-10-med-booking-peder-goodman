package com.health_care.med_booking_backend.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patients")
public class Patient extends User {
    @Column(nullable = false)
    private Date birthdate;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private List<Appointment> patientAppointments;

    public Patient(String firstName, String lastName, Role role, String email, Date birthdate) {
        super(firstName, lastName, email, role);
        this.role = Role.PATIENT;
        this.email = email;
        this.birthdate = birthdate;
    }
}
