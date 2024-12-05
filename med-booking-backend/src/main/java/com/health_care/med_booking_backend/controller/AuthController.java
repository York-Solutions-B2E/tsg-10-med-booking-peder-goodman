package com.health_care.med_booking_backend.controller;

import com.health_care.med_booking_backend.dto.CheckAuthResponse;
import com.health_care.med_booking_backend.model.Admin;
import com.health_care.med_booking_backend.service.AdminService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {
    private final ClientRegistration registration;
    private final AdminService adminService;

    public AuthController(ClientRegistrationRepository registrations, AdminService adminService) {
        this.registration = registrations.findByRegistrationId("okta");
        this.adminService = adminService;
    }

    // Expose the /user endpoint for fetching user data
    @GetMapping("/check")
    public ResponseEntity<CheckAuthResponse> getUser(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return ResponseEntity.ok(new CheckAuthResponse(false, null, "User not authenticated"));
        }

        // Check if user exists in the database, if not, save them
        Admin currentUser = adminService.validateAndStoreAdminUser(user);

        // Return the authenticated user's details
        return ResponseEntity.ok(new CheckAuthResponse(true, currentUser, "User authenticated!"));
    }

    // Handle logout functionality
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response,
                                    @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {
        if (idToken == null) {
            return ResponseEntity.status(400).body("ID Token is missing");
        }

        // Build the URL to log the user out in Okta
        String logoutUrl = this.registration.getProviderDetails().getConfigurationMetadata()
                .get("end_session_endpoint").toString();

        Map<String, String> logoutDetails = new HashMap<>();
        logoutDetails.put("logoutUrl", logoutUrl);
        logoutDetails.put("idToken", idToken.getTokenValue());

        try {
            // Programmatically log out the user
            request.logout();
        } catch (ServletException e) {
            return ResponseEntity.status(500).body("Logout failed");
        }

        return ResponseEntity.ok(logoutDetails);
    }
}
