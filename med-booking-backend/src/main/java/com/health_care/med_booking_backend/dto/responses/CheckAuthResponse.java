
package com.health_care.med_booking_backend.dto.responses;

import com.health_care.med_booking_backend.model.Admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckAuthResponse {
    private boolean authenticated;
    private Admin userDetails;
    private String message;

}