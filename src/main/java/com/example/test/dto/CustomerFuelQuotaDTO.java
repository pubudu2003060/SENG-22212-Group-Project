package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerFuelQuotaDTO {

    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;
}
