package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vehical {

    @Id
    private int vehicalId;
    private int chassiNo;
    private String vehicalType;
    private int vehicalNo;
    private int enginNo;
    private String fualType;
    private String customerId;

}
