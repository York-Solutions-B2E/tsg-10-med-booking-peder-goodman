package com.health_care.med_booking_backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
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
@Table(name = "patient")
public class Patient extends User {
    private Date birthdate;

    public Patient(String firstName, String lastName, Role role, String email, Date birthdate) {
        super(firstName, lastName, email, role);
        this.role = Role.PATIENT;
        this.email = null;
        this.birthdate = birthdate;
    }
}
