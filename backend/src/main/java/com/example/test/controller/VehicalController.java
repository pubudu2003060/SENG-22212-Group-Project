package com.example.test.controller;

import com.example.test.dto.VehicalDTO;
import com.example.test.service.VehicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class VehicalController {

    @Autowired
    VehicalService vehicalService;

    @GetMapping("/getvehicals")
    public List<VehicalDTO> getAllVehicals() {
        return vehicalService.getAllVehicals();
    }

    @GetMapping("/admin/getTotalVehicles")
    public Long getTotalVehicals() {
        return vehicalService.getVehicleCount();
    }

}
