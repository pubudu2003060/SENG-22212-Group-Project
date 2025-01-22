package com.example.test.dto;

import com.example.test.model.VehicalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalFualQuataDTO {

    private int vehicalId;
    private VehicalType vehicalType;
    private int vehicalNo;
    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;
}
