package com.example.test.dto;

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
    private String vehicalType;
    private int vehicalNo;
    private String fualType;
}