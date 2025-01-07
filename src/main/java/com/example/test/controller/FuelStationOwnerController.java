package com.example.test.controller;

import com.example.test.dto.FuelStationOwnerDTO;
import com.example.test.service.FuelStationOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class FuelStationOwnerController {

    @Autowired
    private FuelStationOwnerService fuelStationOwnerService;

    @GetMapping("/getfuelstationowners")
    public List<FuelStationOwnerDTO> getAllFuelStationOwners() {
        return fuelStationOwnerService.getAllFuelStationOwners();
    }

    @PostMapping("/addfuelstationowner")
    public FuelStationOwnerDTO saveFuelStationOwner(@RequestBody FuelStationOwnerDTO fuelStationOwnerDTO) {
        return fuelStationOwnerService.saveFuelStationOwner(fuelStationOwnerDTO);
    }
}
