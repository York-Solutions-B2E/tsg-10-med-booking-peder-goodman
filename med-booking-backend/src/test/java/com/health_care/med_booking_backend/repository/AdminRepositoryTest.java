package com.health_care.med_booking_backend.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.health_care.med_booking_backend.model.Admin;

@ActiveProfiles("test")
@DataJpaTest
public class AdminRepositoryTest {

    @Autowired
    private AdminRepository adminRepository;

    // Test finding admin by okta id
    @Test
    void testFindAdminByOktaId_returnsAdmin() {
        // Arrange
        Admin admin1 = new Admin("Admin", "Joe", "admin-joe@gmail.com", "okta-id-1");
        adminRepository.save(admin1);

        // Act
        Optional<Admin> foundAdmin = adminRepository.findAdminByOktaId("okta-id-1");

        // Assert
        assertThat(foundAdmin).isPresent();
    }

    // Test not finding admin by okta id
    @Test
    void testFindAdminByOktaId_returnsEmpty() {
        // Act
        Optional<Admin> foundAdmin = adminRepository.findAdminByOktaId("okta-id-2");

        assertThat(foundAdmin).isEmpty();
    }
}
