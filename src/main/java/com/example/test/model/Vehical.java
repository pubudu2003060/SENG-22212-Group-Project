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

    @Column(nullable = false, unique = true)
    private int chassiNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicalType vehicalType;

    @Column(nullable = false, unique = true)
    private int vehicalNo;

    @Column(nullable = false, unique = true)
    private int enginNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fualType;

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

}
