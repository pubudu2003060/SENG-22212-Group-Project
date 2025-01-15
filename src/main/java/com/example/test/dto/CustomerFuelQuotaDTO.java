package com.example.test.dto;

import com.example.test.model.User;
import com.example.test.model.Vehical;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "vehicalId", referencedColumnName = "vehicalId", nullable = false)
    private Vehical vehical;
}
