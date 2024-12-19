package com.health_care.med_booking_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import com.health_care.med_booking_backend.config.TestSecurityConfig;

@SpringBootTest
// @ActiveProfiles("test")
@Import(TestSecurityConfig.class)
class MedBookingBackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
