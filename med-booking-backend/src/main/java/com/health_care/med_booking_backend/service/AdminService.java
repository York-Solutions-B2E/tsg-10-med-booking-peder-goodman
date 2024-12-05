package com.health_care.med_booking_backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.health_care.med_booking_backend.model.Admin;
import static com.health_care.med_booking_backend.model.Role.ADMIN;
import com.health_care.med_booking_backend.repository.AdminRepository;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Transactional
    public synchronized Admin validateAndStoreAdminUser(OAuth2User user) {
        // Deconstruct user object from Okta and make it usable for our DB needs
        Map<String, Object> attributes = user.getAttributes();
        String email = (String) attributes.get("preferred_username");
        String first_name = (String) attributes.get("given_name");
        String last_name = (String) attributes.get("family_name");
        String oktaId = (String) attributes.get("sub");

        // create new user object
        Admin currentUser = new Admin(first_name, last_name, email, ADMIN, oktaId);

        // check if user exists in database
        Optional<Admin> doesOktaUserExist = adminRepository.findAdminByOktaId(oktaId);

        // if user exists, send user data back to database
        if (doesOktaUserExist.isPresent()) {
            return doesOktaUserExist.get();
        } else {
            // if user doesn't exist, add them to DB, then send user data to frontend from
            // database
            adminRepository.save(currentUser);
            return adminRepository.findAdminByOktaId(oktaId)
                    .orElseThrow(() -> new IllegalStateException("Okta User " + oktaId + " did not save"));
        }
    }
}
