package com.example.test.dto;

import com.example.test.model.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationManagementDTO {

    private int stationId;
    private String location;
    private Status status;
    private StationType stationType;
    private int registeredId;
    private int capacity;
    private EligibleFuelCapacity eligibleFuelCapacity;
    private FuelType fuelType;

    @ManyToOne
    @JoinColumn(name = "stationOwnerid", referencedColumnName = "stationOwnerid", nullable = false)
    private FuelStationOwner fuelStationOwner;
}
