package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BuyQuota {

    @Id
    private int bqId;
    private int amount;
    private Date date;
    private int customerId;
    private int vehicalId;
    private int fuelstationId;

}
