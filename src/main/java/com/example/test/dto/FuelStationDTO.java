package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationDTO {

    private int stationId;
    private String location;
    private String status;
    private String stationType;
    private int registeredId;
    private int capacity;
    private int eligibleFuelCapacity;
    private String fuelType;
    private String username;
    private String password;
}
