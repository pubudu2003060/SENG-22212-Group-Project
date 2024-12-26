package com.gasstation.backendPart1.controller;


import com.gasstation.backendPart1.dataTransferObject.UserDTO;
import com.gasstation.backendPart1.dataTransferObject.VehicalDTO;
import com.gasstation.backendPart1.service.VehicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/")
@CrossOrigin
public class VehicalController {

    @Autowired
    private VehicalService vehicalService;

    @GetMapping("/getVehicals")
    public List<VehicalDTO> getVehicals() {
        return vehicalService.getAllVehical();
    }

    @PostMapping("/addvehical")
    public VehicalDTO saveVehical(@RequestBody VehicalDTO vehicalDTO) {
        return vehicalService.saveVehical(vehicalDTO);
    }

    @PutMapping("/updateVehical")
    public VehicalDTO updateVehical(@RequestBody VehicalDTO vehicalDTO) {
        return vehicalService.updateVehical(vehicalDTO);
    }

    @DeleteMapping("/deletevehical/{vehicalId}")
    public String deleteVehical(@PathVariable Integer vehicalId) {
        return vehicalService.deleteVehical(vehicalId);
    }
}
