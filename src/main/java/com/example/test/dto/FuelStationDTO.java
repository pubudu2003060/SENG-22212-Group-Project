package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationDTO {

    private int s_id;
    private String location;
    private String status;
    private String station_type;
    private int registered_id;
    private int capacity;
    private int eligible_fuel_capacity;
    private String fuel_type;
    private String username;
    private String password;
}
