package com.example.test.model;

import com.example.test.enump.EligibleFuelCapacity;
import com.example.test.enump.FuelType;
import com.example.test.enump.StationType;
import com.example.test.enump.Status;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EligibleFuelCapacity eligibleFuelCapacity;

    @Column(nullable = false)
    private int capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @Column(nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "stationOwnerid", referencedColumnName = "stationOwnerid", nullable = false)
    @JsonBackReference
    private FuelStationOwner fuelStationOwner;

}
