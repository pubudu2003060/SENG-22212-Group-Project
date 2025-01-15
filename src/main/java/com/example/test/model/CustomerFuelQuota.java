package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerFuelQuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerFuelQuotaId;

    @Column(nullable = false)
    private String eligibleDays;

    @Column(nullable = false)
    private int eligibleFuelQuota;

    @Column(nullable = false)
    private int remainFuel;

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "vehicalId", referencedColumnName = "vehicalId", nullable = false)
    private Vehical vehical;
}
