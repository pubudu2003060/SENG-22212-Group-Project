package com.example.test.dto;

import com.example.test.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicalDTO {

    private int vehicalId;
    private int chassiNo;
    private String vehicalType;
    private int vehicalNo;
    private int enginNo;
    private String fualType;
    private User user;
}
