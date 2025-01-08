package com.example.test.dto;

import com.example.test.model.FuelStationOwner;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @JoinColumn(name = "stationOwnerid", referencedColumnName = "stationOwnerid", nullable = false)
    private FuelStationOwner fuelStationOwner;
}
