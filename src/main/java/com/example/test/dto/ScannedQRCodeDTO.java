package com.example.test.dto;

import com.example.test.enump.VehicalType;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class ScannedQRCodeDTO {

    private String vehicleNo;
    private VehicalType vehicalType;
    private int remainFuel;
    private String eligibleDays;
}
