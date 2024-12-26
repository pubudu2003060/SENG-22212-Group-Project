package com.gasstation.backendPart1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class fuelStation {

    @Id
    private int stationId;
    private int registeredId;
    private String location;
    private String fuelType;
    private String stationType;
    private Float capacity;
    private Float eligibleCapacity;
    private Float remainCapacity;
    private String stationStatus;


}
