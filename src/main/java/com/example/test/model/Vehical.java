package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vehical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
