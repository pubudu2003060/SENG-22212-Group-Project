package com.example.test.dto;

import com.example.test.enump.FuelType;
import com.example.test.enump.VehicalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyQuatoVehicleDTO {

    private int bqId;
    private int amount;
    private Date date;
    private int vehicalId;
    private VehicalType vehicalType;
    private int vehicalNo;
    private FuelType fualType;

}
