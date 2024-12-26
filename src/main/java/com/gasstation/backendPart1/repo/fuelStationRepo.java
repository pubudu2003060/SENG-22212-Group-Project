package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.fuelStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface fuelStationRepo extends JpaRepository<fuelStation, Integer> {

}
