package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

}
