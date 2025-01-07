package com.example.test.repo;

import com.example.test.model.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelStationRepo extends JpaRepository<FuelStation, Integer> {
}
