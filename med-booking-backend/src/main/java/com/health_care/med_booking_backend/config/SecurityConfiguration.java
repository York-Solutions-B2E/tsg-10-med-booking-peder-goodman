package com.health_care.med_booking_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SimpleSavedRequest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
                        .requestMatchers("/api/patients/**", "/api/appointments/**", "/api/doctors/**", "/api/doctors/doctors-specializations", "/api/doctor/get/*").permitAll()
                        // secure the rest of the app
                        .anyRequest().authenticated())
                // Enable CORS and CSRF protection
                .csrf((csrf) -> csrf
                        // allow access to the following paths without CSRF protection
                        .ignoringRequestMatchers("/api/patients/**", "/api/appointments/**", "/api/doctors/**", "/api/doctors/doctors-specializations", "/api/doctor/get/*")
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))
                // Configure logout
                .logout(logout -> logout
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID", "XSRF-TOKEN"))
                .addFilterAfter(new CookieCsrfFilter(), BasicAuthenticationFilter.class) //
                // disabled to test api without
                // Configure login
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:3000/admin", true));
        return http.build();
    }

    @Bean
    public RequestCache refererRequestCache() {
        return new HttpSessionRequestCache() {
            @Override
            public void saveRequest(HttpServletRequest request, HttpServletResponse response) {
                String referrer = request.getHeader("referer");
                if (referrer == null) {
                    referrer = request.getRequestURL().toString();
                }
                request.getSession().setAttribute("SPRING_SECURITY_SAVED_REQUEST",
                        new SimpleSavedRequest(referrer));

            }
        };
    }
}
