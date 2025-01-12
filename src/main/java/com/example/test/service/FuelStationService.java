package com.example.test.service;

import com.example.test.dto.FuelStationDTO;
import com.example.test.model.*;
import com.example.test.repo.FuelStationRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FuelStationService {

    @Autowired
    private FuelStationRepo fuelStationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<FuelStationDTO> getAllFuelStations() {
        List<FuelStation> fuelStationList = fuelStationRepo.findAll();
        return modelMapper.map(fuelStationList, new TypeToken<List<FuelStationDTO>>() {
        }.getType());
    }

    public FuelStationDTO getStationsByStatus(Status status) {
       List<FuelStation> fuelStationList=fuelStationRepo.findByStatus(status);
       return modelMapper.map(fuelStationList,new TypeToken<List<FuelStationDTO>>() {}.getType());
    }

    public FuelStationDTO getStationsByFuelType(FuelType fuelType) {
        List<FuelStation> fuelStationList=fuelStationRepo.findByFuelType(fuelType);
        return modelMapper.map(fuelStationList,new TypeToken<List<FuelStationDTO>>() {}.getType());
    }

    public FuelStationDTO getStationsByStationType(StationType stationType) {
        List<FuelStation> fuelStationList=fuelStationRepo.findByStationType(stationType);
        return modelMapper.map(fuelStationList,new TypeToken<List<FuelStationDTO>>() {}.getType());
    }

    public FuelStationDTO getStationsByEligibleFuelCapacity(EligibleFuelCapacity eligibleFuelCapacity) {
        List<FuelStation> fuelStationList=fuelStationRepo.findByEligibleFuelCapacity(eligibleFuelCapacity);
        return modelMapper.map(fuelStationList,new TypeToken<List<FuelStationDTO>>() {}.getType());
    }
}
