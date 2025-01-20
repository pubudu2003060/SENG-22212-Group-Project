package com.example.test.controller;

import com.example.test.dto.FuelStationDTO;
import com.example.test.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class FuelStationLayerController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping("/savefuelstation")
    public FuelStationDTO savefuelStation(@RequestBody FuelStationDTO fuelStationDTO) {
        return fuelStationService.saveFuelStation(fuelStationDTO);
    }

}
