package com.example.test.repo;

import com.example.test.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FuelStationRepo extends JpaRepository<FuelStation, Integer> {


    @Override
    Optional<FuelStation> findById(Integer id);

    List<FuelStation> findByStatus(Status status);

    boolean existsFuelStationByUsernameAndPassword(String username, String password);

}
