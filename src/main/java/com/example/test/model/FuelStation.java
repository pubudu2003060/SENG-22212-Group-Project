package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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