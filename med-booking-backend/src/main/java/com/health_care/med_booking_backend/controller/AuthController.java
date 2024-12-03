package com.health_care.med_booking_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final ClientRegistration registration;
    // private final UserService userService;

    // public AuthController(ClientRegistrationRepository registrations, UserService
    // userService) {
    public AuthController(ClientRegistrationRepository registrations) {
        this.registration = registrations.findByRegistrationId("okta");
        // // this.userService = userService;
    }

    // Expose the /user endpoint for fetching user data
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/check")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return ResponseEntity.ok("User not authenticated");
            // return ResponseEntity.status(401).body("User not authenticated");
        }

        // Check if user exists in the database, if not, save them
        // User currentUser = userService.checkAndSaveAuthenticatedUser(user);

        // Return the authenticated user's details
        // return ResponseEntity.ok(currentUser);
        return ResponseEntity.ok(user.getAttributes());
    }

    // Handle logout functionality
    @CrossOrigin(origins = "http://localhost:3000")
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

        // Clear the session
        if (request.getSession(false) != null) {
            // Invalidate the current session
            request.getSession(false).invalidate();
        }

        // Manually clear authentication
        SecurityContextHolder.clearContext();

        // Manually delete cookies
        deleteCookies(request, response, "JSESSIONID", "XSRF-TOKEN");

        // Verify that the context is cleared
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            System.out.println("Security context successfully cleared.");
        } else {
            System.out.println("Security context not cleared.");
        }

        return ResponseEntity.ok(logoutDetails);
    }

    // weird hack to delete cookies
    // considering calling a logout endpoint on the backend to clear the session via the logout functionality in spring security
    private void deleteCookies(HttpServletRequest request, HttpServletResponse response, String... cookiesToDelete) {
        for (String cookieName : cookiesToDelete) {
            Cookie cookie = new Cookie(cookieName, null);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0);
            cookie.setDomain(request.getServerName()); // Set the domain to the server name
            response.addCookie(cookie);
        }
    }
}
