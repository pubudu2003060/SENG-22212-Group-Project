package com.example.test.dto;

import com.example.test.enump.FuelType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BQDetailsDTO {

    private int customerFuelQuotaId;
    private int amount;
    private int registeredId;
    private FuelType fuelType;

}
