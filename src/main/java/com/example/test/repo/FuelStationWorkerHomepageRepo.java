package com.example.test.repo;

import com.example.test.model.FuelStation;
import com.example.test.model.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelStationWorkerHomepageRepo extends JpaRepository<FuelStation, Integer> {
}
