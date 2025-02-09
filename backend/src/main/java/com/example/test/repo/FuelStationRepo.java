package com.example.test.repo;

import com.example.test.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FuelStationRepo extends JpaRepository<FuelStation, Integer> {


    @Override
    Optional<FuelStation> findById(Integer id);

    List<FuelStation> findByStatus(Status status);

    //boolean existsFuelStationByUsernameAndPassword(String username, String password);

    @Query("SELECT COUNT(s) FROM FuelStation s WHERE s.status = 'ACTIVE'")
    long getTotalActiveStations();

    @Query("SELECT s FROM FuelStation s WHERE s.capacity < 8000")
    List<FuelStation> findStationsWithCapacityBelow8000();


    FuelStation getFuelStationByRegisteredId(int registeredId);

    FuelStation findFuelStationByRegisteredId(int registeredId);


}
