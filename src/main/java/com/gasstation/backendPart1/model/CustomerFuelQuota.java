package com.gasstation.backendPart1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class CustomerFuelQuota {
    @Id
    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;

}
