package com.example.test.dto;

import com.example.test.model.Vehical;
import com.example.test.model.VehicalType;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class ScannedQRCodeDTO {

    private int vehicleNo;
    private VehicalType vehicalType;
    private int remainFuel;
    private String eligibleDays;
}
