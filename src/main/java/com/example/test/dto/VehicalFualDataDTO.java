package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalFualDataDTO {

    private int vehicalId;
    private String vehicalType;
    private int vehicalNo;
    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;
    private int bqId;
    private int amount;
    private Date date;


}