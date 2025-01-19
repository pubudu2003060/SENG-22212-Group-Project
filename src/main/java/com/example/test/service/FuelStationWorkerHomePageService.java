package com.example.test.service;

import com.example.test.controller.FuelStationWorkerHomePageController;
import com.example.test.model.EligibleFuelCapacity;
import com.example.test.model.FuelStation;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class FuelStationWorkerHomePageService {

    @Autowired
    private FuelStationWorkerHomepageRepo fuelStationWorkerHomepageRepo;

    @Autowired
    private ModelMapper modelMapper;


    public EligibleFuelCapacity getEligibleFuelCapacity() {
        FuelStation fuelStation = fuelStationWorkerHomepageRepo.findById(id);
        return modelMapper.map(fuelStation, FuelStationWorkerHomePageDTO.class);
    }
}
