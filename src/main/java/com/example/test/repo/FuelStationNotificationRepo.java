package com.example.test.repo;

import com.example.test.model.FuelStationNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelStationNotificationRepo extends JpaRepository<FuelStationNotification, Integer> {
}
