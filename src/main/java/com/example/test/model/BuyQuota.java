package com.example.test.model;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicalId", referencedColumnName = "vehicalId", nullable = false)
    private Vehical vehical;

    @ManyToOne
    @JoinColumn(name = "fuelstationId", referencedColumnName = "stationId", nullable = false)
    private FuelStation fuelStation;

}
