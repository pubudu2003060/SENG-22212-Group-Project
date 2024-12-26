package com.gasstation.backendPart1.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StationDTO {
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
