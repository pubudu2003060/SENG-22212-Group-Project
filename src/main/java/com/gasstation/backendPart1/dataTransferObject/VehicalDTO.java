package com.gasstation.backendPart1.dataTransferObject;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicalDTO {

    private int vehicalId;
    private int chassiNo;
    private String vehicalType;
    private int vehicalNo;
    private int enginNo;
    private String fualType;
}
