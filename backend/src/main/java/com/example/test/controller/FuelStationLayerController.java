package com.example.test.controller;

import com.example.test.dto.FuelStationDTO;
import com.example.test.dto.FuelStationLoginDTO;
import com.example.test.dto.FuelStationOwnerDTO;
import com.example.test.model.FuelStationOwner;
import com.example.test.service.FuelStationOwnerService;
import com.example.test.service.FuelStationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class FuelStationLayerController {

    @Autowired
    private FuelStationService fuelStationService;

    @PostMapping("/loginfuelstation")
    public ResponseEntity<String> loginFuelStation(@RequestBody FuelStationLoginDTO fuelStationLoginDTO) {
        return fuelStationService.loginFuelStation(fuelStationLoginDTO.getRegisteredId(), fuelStationLoginDTO.getPassword());
    }

}
