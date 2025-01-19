package com.example.test.controller;

import com.example.test.model.EligibleFuelCapacity;
import com.example.test.service.FuelStationWorkerHomePageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class FuelStationWorkerHomePageController {
    private FuelStationWorkerHomePageService fuelStationWorkerHomePageService;

    @GetMapping("/getEligibleFuelQuota")
    public EligibleFuelCapacity getEligibleFuelCapacity() {
        return fuelStationWorkerHomePageService.getEligibleFuelCapacity();
    }
}
