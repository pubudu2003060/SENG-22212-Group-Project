package com.example.test.dto;

import com.example.test.enump.VehicalType;
import com.example.test.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleMockDataDTO {
    private String chassiNo;
    private VehicalType vehicalType;
    private String vehicalNo;
    private String enginNo;
}
