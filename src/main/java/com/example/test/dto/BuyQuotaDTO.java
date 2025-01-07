package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BuyQuotaDTO {

    private int bqId;
    private int amount;
    private Date date;
    private int customerId;
    private int vehicalId;
    private int fuelstationId;
}
