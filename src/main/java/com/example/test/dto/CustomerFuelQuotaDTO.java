package com.example.test.dto;

import com.example.test.model.User;
import com.example.test.model.Vehical;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.*;
import org.hibernate.annotations.Formula;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class CustomerFuelQuotaDTO {

    private int customerFuelQuotaId;
    private String eligibleDays;
    private int eligibleFuelQuota;
    private int remainFuel;
    @Formula("eligible_fuel_quota - remain_fuel")
    private int usedFuelQuota;
    private User user;
    private Vehical vehical;


}
