package com.gasstation.backendPart1.dataTransferObject;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class StationOwnerDTO {
    private int ownerId;
    private String name;
    private String contactNo;
}
