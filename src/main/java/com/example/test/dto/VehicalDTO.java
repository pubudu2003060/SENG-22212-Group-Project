package com.example.test.dto;

import com.example.test.model.User;
import com.example.test.model.VehicalType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalDTO {

    private int vehicalId;
    private int chassiNo;
    private VehicalType vehicalType;
    private int vehicalNo;
    private int enginNo;
    private String fualType;
    private User user;
}
