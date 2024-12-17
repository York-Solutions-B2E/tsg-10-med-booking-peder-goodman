package com.health_care.med_booking_backend.model;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class UserTest {

    @Test
    void testGetFullName() {
        User user = new User("John", "Doe", "john@email.com", Role.PATIENT);

        String fullName = user.getFullName();

        assertThat(fullName).isEqualTo("John Doe");
    }
}
