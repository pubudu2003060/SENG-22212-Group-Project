package com.gasstation.backendPart1.controller;


import com.gasstation.backendPart1.dataTransferObject.StationOwnerDTO;
import com.gasstation.backendPart1.dataTransferObject.UserDTO;
import com.gasstation.backendPart1.service.StationOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")

public class StationOwnerController {

    @Autowired
    private StationOwnerService stationOwnerService;

    @GetMapping("/getowners")
    public List<StationOwnerDTO> getOwner() {
        return stationOwnerService.getAllStationOwners();
    }

    @PostMapping("/addowner")
    public StationOwnerDTO saveStationOwner(@RequestBody StationOwnerDTO stationOwnerDTO) {
        return stationOwnerService.saveStationOwner(stationOwnerDTO);
    }

    @PutMapping("/updatowner")
    public StationOwnerDTO updateStationOwner(@RequestBody StationOwnerDTO stationOwnerDTO) {
        return stationOwnerService.updateStationOwner(stationOwnerDTO);
    }

    @DeleteMapping("/deleteowner/{ownerId}")
    public String deleteStationOwner(@PathVariable Integer ownerId) {
        return stationOwnerService.deleteStationOwner(ownerId);
    }

}
