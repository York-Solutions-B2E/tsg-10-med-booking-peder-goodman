package com.health_care.med_booking_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.health_care.med_booking_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
