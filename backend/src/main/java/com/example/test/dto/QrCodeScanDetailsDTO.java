package com.example.test.dto;

import com.example.test.enump.EligibleFuelCapacity;
import com.example.test.enump.FuelType;
import com.example.test.enump.VehicalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QrCodeScanDetailsDTO {

    private String firstName;
    private String lastName;
   private String idNo;
  private VehicalType vehicalType;
   private String vehicalNo;
    private FuelType fualType;
   private String eligibleDays;
   private int eligibleFuelQuota;
   private int remainFuel;

}
