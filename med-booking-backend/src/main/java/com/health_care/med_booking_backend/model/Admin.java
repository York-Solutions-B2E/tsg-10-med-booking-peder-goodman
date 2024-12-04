package com.health_care.med_booking_backend.model;

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
@Table(name = "admins")
public class Admin extends User {
    private String oktaId;

    public Admin(String firstName, String lastName, String email, Role role, String oktaId) {
        super(firstName, lastName, email, role);
        this.oktaId = oktaId;
    }
}
