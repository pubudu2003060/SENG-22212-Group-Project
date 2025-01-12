package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationOwner {

    @Id
    private int stationOwnerid;
    private String name;
    private String contact;
    private String address;
    private int nicNo;

}
