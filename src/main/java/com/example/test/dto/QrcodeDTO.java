package com.example.test.dto;

import com.example.test.model.CustomerFuelQuota;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QrcodeDTO {

    private int qrcodeId;
    private String content;

    @OneToOne
    @JoinColumn(name = "customerFuelQuotaId",referencedColumnName = "customerFuelQuotaId")
    private CustomerFuelQuota customerFualQuata;
}
