package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Qrcode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qrcodeId;

    @Column(nullable = false)
    private String content;

    @OneToOne
    @JoinColumn(name = "customerFuelQuotaId",referencedColumnName = "customerFuelQuotaId")
    private CustomerFuelQuota customerFualQuata;
}
