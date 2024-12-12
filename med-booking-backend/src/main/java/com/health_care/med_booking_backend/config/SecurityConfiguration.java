package com.health_care.med_booking_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                // Define authorization rules
                .authorizeHttpRequests((authz) -> authz
                        // allow access to the following paths without authentication
                        .requestMatchers("/", "/index.html", "/static/**",
                                "/*.ico", "/*.json", "/*.png", "/api/auth/check", "/api/auth/login")
                        .permitAll()
                        .requestMatchers("/api/patients/**", "/api/appointments/**",
                                "/api/doctors/doctors-specializations", "/api/doctors/get/*")
                        .permitAll()
                        // if the route is not one of the above, any other route requires authentication
                        .anyRequest().authenticated())
                // Enable CORS and CSRF protection
                .csrf((csrf) -> csrf
                        // allow access to the following paths without CSRF protection for POST, PUT,
                        // DELETE
                        .ignoringRequestMatchers("/api/patients/**", "/api/appointments/**",
                                "/api/doctors/doctors-specializations", "/api/doctors/get/*")
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))
                // Configure logout
                .logout(logout -> logout
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID", "XSRF-TOKEN"))
                // Add CSRF filter
                .addFilterAfter(new CookieCsrfFilter(), BasicAuthenticationFilter.class)
                // Configure login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:3000/admin", true));
        return http.build();
    }
}
