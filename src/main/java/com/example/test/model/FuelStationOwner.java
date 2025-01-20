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
    private String name;
    private String contact;
    private String address;
    @Column(unique = true)
    private int nicNo;

}
