package com.example.test.controller;

import com.example.test.dto.FuelStationDTO;
import com.example.test.dto.FuelStationManagementDTO;
import com.example.test.model.Status;
import com.example.test.service.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class FuelStationController {

    @Autowired
    private FuelStationService fuelStationService;

    @GetMapping("/getfuelstations")
    public List<FuelStationManagementDTO> getAllFuelStations() {
        return fuelStationService.getAllFuelStations();
    }

    @PutMapping("/updateStatus/{id}")
    public FuelStationManagementDTO updateFuelStation(@PathVariable int id, @RequestParam Status status) {
        return fuelStationService.updateFuelStationStatus(id, status);
    }

    @GetMapping("/filterByStatus")
    public List<FuelStationManagementDTO> filterByStatus(@RequestParam Status status) {
        return fuelStationService.filterStationByStatus(status);
    }

    @GetMapping("/getFuelStationDetails/{id}")
    public FuelStationManagementDTO getFuelStationDetails(@PathVariable int id) {
        return fuelStationService.getFuelStationDetails(id);
    }

    @GetMapping("/searchFuelStation")
    public FuelStationManagementDTO searchFuelStation(@RequestParam Integer id) {
        return fuelStationService.searchFuelStationByID(id);
    }

    @PostMapping("/addfuelstation")
    public FuelStationDTO addFuelStation(@RequestBody FuelStationDTO fuelStationDTO) {
        try {
            return fuelStationService.addFuelStation(fuelStationDTO);
        }
        catch (Exception e) {
            throw new DuplicateKeyException(e.getMessage());
        }
    }



}
