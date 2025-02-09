package com.example.test.dto;

import com.example.test.model.User;
import com.example.test.enump.VehicalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalDTO {

    private int vehicalId;
    private String chassiNo;
    private VehicalType vehicalType;
    private String vehicalNo;
    private String enginNo;
    private String fualType;
    private User user;
}
