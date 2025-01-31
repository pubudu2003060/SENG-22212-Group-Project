package com.example.test.repo;

import com.example.test.model.FuelStationOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FuelStationOwnerRepo extends JpaRepository<FuelStationOwner, Integer> {

    FuelStationOwner getFuelStationOwnerByNicNo(int nicNo);

    boolean existsFuelStationOwnerByNicNo(int nicNo);
}
