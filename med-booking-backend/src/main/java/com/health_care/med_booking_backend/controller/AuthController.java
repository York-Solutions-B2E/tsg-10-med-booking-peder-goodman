package com.health_care.med_booking_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health_care.med_booking_backend.model.Admin;
import com.health_care.med_booking_backend.responses.CheckAuthResponse;
import com.health_care.med_booking_backend.responses.LogoutResponse;
import com.health_care.med_booking_backend.service.AdminService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
    public ResponseEntity<LogoutResponse> logout(HttpServletRequest request, HttpServletResponse response,
            @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {
        if (idToken == null) {
            return ResponseEntity.status(400).body(new LogoutResponse("User not authenticated", null, null));
        }

        // Build the URL to log the user out in Okta
        String logoutUrl = this.registration.getProviderDetails().getConfigurationMetadata()
                .get("end_session_endpoint").toString();

        // String idTokenValue = idToken.getTokenValue();

        try {
            // Programmatically log out the user
            request.logout();
        } catch (ServletException e) {
            return ResponseEntity.status(500)
                    .body(new LogoutResponse("server session invalidation failed", null, null));
        }

        return ResponseEntity.status(200)
                .body(new LogoutResponse("Logout Successful!", idToken.getTokenValue(), logoutUrl));
    }

}
