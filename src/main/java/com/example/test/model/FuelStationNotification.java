package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fsnId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "fuelstationId", referencedColumnName = "stationId", nullable = false)
    private FuelStation fuelStation;
}
