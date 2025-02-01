package com.example.test.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(nullable = false)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StationType stationType;

    @Column(nullable = false,unique = true)
    private int registeredId;

    @Column(nullable = false)
    private int capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EligibleFuelCapacity eligibleFuelCapacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "stationOwnerid", referencedColumnName = "stationOwnerid", nullable = false)
    @JsonBackReference
    private FuelStationOwner fuelStationOwner;
}


