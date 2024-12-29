package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.CustomerNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerNotificationRepo extends JpaRepository<CustomerNotification, Integer> {
}
