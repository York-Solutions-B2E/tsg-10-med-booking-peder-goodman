package com.health_care.med_booking_backend.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogoutResponse {
    private String message;
    private String idToken;
    private String logoutUrl;
}
