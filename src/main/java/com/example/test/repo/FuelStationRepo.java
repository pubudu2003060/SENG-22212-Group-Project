package com.example.test.repo;

import com.example.test.model.*;
import com.twilio.rest.autopilot.v1.assistant.FieldType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FuelStationRepo extends JpaRepository<FuelStation, Integer> {


    List<FuelStation> findByStatus(Status status);


}
