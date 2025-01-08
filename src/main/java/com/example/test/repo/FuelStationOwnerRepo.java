package com.example.test.repo;

import com.example.test.model.FuelStationOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelStationOwnerRepo extends JpaRepository<FuelStationOwner, Integer> {
}
