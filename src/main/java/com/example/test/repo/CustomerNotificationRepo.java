package com.example.test.repo;

import com.example.test.model.CustomerNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerNotificationRepo extends JpaRepository<CustomerNotification,Integer> {
}
