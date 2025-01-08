package com.example.test.controller;

import com.example.test.dto.FuelStationDTO;
import com.example.test.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @GetMapping("/getfuelstations")
    public List<FuelStationDTO> getAllFuelStations() {
        return fuelStationService.getAllFuelStations();
    }

    @PostMapping("/addfuelstation")
    public FuelStationDTO saveFuelStation(@RequestBody FuelStationDTO fuelStationDTO) {
        return fuelStationService.saveFuelStation(fuelStationDTO);
    }
}
