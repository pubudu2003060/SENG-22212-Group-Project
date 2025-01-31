package com.example.test.model;

import com.example.test.enump.FuelType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bqId;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

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
