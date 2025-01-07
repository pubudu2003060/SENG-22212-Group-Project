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
public class FuelStationNotification {

    @Id
    private int fsnId; // Primary Key
    private String content;
    private int fuelStationID;
}
