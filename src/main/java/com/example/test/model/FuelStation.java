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
public class FuelStation {

    @Id
    private int s_id;
    private String location;
    private String status; // e.g., [active, not active]
    private String station_type; // e.g., [gov, spec, other]
    private int registered_id;
    private int capacity;
    private int eligible_fuel_capacity;
    private String fuel_type; // e.g., [petrol, diesel, both]
    private String username;
    private String password;
}
