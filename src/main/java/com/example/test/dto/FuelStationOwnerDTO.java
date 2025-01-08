package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationOwnerDTO {

    private int stationOwnerid;
    private String name;
    private String contact;
}
