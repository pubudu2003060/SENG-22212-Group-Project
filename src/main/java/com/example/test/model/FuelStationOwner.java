package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stationOwnerid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String contact;

    @Column(nullable = false)
    private String address;

    @Column(unique = true, nullable = false)
    private int nicNo;

}
