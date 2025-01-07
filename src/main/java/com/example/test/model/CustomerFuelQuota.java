package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerFuelQuota {

    @Id
    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;
}
