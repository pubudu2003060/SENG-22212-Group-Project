package com.example.test.model;

import com.example.test.enump.FuelType;
import com.example.test.enump.VehicalType;
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
    private String chassiNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicalType vehicalType;

    @Column(nullable = false, unique = true)
    private String vehicalNo;

    @Column(nullable = false, unique = true)
    private String enginNo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fualType;

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "userId", nullable = false)
    private User user;

}
