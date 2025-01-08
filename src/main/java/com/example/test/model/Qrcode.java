package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Qrcode {

    @Id
    private int qrcodeId;
    private int customerFualQuataId;

    @OneToOne
    @JoinColumn(name = "customerFuelQuotaId",referencedColumnName = "customerFuelQuotaId")
    private CustomerFuelQuota customerFualQuata;
}
