package com.example.test.controller;

import com.example.test.service.AdminLayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "api/v1")
@CrossOrigin
public class AdminLayerController {

    @Autowired
    private AdminLayerService adminLayerService;


    @GetMapping("/getBuyQuotasDataByFuelType/{fualType}")
    public Map<String, Map<String, Double>> getBuyQuotasDataByFuelType(@PathVariable("fualType") String fuelType) {
        return adminLayerService.getBuyQuotasDataByFuelType(fuelType);
    }

}
