package com.example.test.dto;

import com.example.test.model.FuelStation;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FuelStationNotificationDTO {

    private int fsnId; // Primary Key
    private String content;
    private FuelStation fuelStation;
}
