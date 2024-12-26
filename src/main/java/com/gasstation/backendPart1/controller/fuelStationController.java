package com.gasstation.backendPart1.controller;

import com.gasstation.backendPart1.dataTransferObject.StationDTO;
import com.gasstation.backendPart1.service.fuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class fuelStationController {

        @Autowired
        private fuelStationService fuelStationService;

        @GetMapping("/getstations")
        public List<StationDTO> getAllStations() {
            return fuelStationService.getAllStations();
        }

        @PostMapping("/addstation")
        public StationDTO saveStation(@RequestBody StationDTO stationDTO) {
            return fuelStationService.saveStation(stationDTO);
        }

        @PutMapping("/updatestation")
        public StationDTO updateStation(@RequestBody StationDTO stationDTO) {
            return fuelStationService.updateStation(stationDTO);
        }

        @DeleteMapping("/deletestation/{stationId}")
        public String deleteStation(@PathVariable Integer stationId) {
            return fuelStationService.deleteStation(stationId);
        }


    }


