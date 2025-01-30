package com.example.test.dto;

import com.example.test.enump.FuelType;
import com.example.test.model.FuelStation;
import com.example.test.model.User;
import com.example.test.model.Vehical;
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
    private FuelType fuelType;
    private User user;
    private Vehical vehical;
    private FuelStation fuelStation;
}
