package com.example.test.dto;

import com.example.test.model.StationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyquotaFuelStationDTO {

    private int bqId;
    private int amount;
    private Date date;
    private String fuelType;
    private int stationId;
    private StationType stationType;

}
