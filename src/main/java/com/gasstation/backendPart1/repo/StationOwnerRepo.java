package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.StationOwner;
import com.gasstation.backendPart1.model.fuelStation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationOwnerRepo extends JpaRepository<StationOwner, Integer> {
}
