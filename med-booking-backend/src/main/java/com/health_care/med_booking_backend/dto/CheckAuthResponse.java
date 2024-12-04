
package com.health_care.med_booking_backend.dto;

import com.health_care.med_booking_backend.model.Admin;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CheckAuthResponse {

    private boolean authenticated;
    private Admin userDetails;
    private String message;

    public CheckAuthResponse(boolean authenticated, Admin userDetails, String message) {
        this.authenticated = authenticated;
        this.userDetails = userDetails;
        this.message = message;
    }
}