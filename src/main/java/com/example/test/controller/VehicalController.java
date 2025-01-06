package com.example.test.controller;

import com.example.test.dto.VehicalDTO;
import com.example.test.service.VehicalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class VehicalController {

    @Autowired
    VehicalService vehicalService;

    @PostMapping("/addvehical")
    public VehicalDTO addVehical(@RequestBody VehicalDTO vehicalDTO) {
        return vehicalService.addVehical(vehicalDTO);
    }

    @GetMapping("/getvehicals")
    public List<VehicalDTO> getAllVehicals() {
        return vehicalService.getAllVehicals();
    }
}
