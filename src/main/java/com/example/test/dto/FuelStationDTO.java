package com.example.test.dto;

import com.example.test.enump.EligibleFuelCapacity;
import com.example.test.enump.FuelType;
import com.example.test.enump.StationType;
import com.example.test.enump.Status;
import com.example.test.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FuelStationDTO {

    private int stationId;
    private String location;
    private Status status;
    private StationType stationType;
    private int registeredId;
    private int capacity;
    private EligibleFuelCapacity eligibleFuelCapacity;
    private FuelType fuelType;
    private String username;
    private String password;
    private FuelStationOwner fuelStationOwner;

}
