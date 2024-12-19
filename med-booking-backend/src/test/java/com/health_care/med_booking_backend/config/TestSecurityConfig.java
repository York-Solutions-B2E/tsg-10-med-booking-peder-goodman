package com.health_care.med_booking_backend.config;

import java.util.ArrayList;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class TestSecurityConfig {

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    //     Authentication mockAuth = Mockito.mock(Authentication.class);
    //     User mockUser = new User("testUser", "password", new ArrayList<>());

    //     Mockito.when(mockAuth.isAuthenticated()).thenReturn(true);
    //     Mockito.when(mockAuth.getPrincipal()).thenReturn(mockUser);

    //     http
    //             .authorizeHttpRequests(authz -> authz
    //                     .anyRequest().permitAll())
    //             .csrf(csrf -> csrf.disable())
    //             .addFilterBefore(new UsernamePasswordAuthenticationFilter() {
    //                 @Override
    //                 public Authentication attemptAuthentication(HttpServletRequest request,
    //                         HttpServletResponse response) {
    //                     return mockAuth;
    //                 }
    //             },
    //                     UsernamePasswordAuthenticationFilter.class);

    //     return http.build();

    // }

}