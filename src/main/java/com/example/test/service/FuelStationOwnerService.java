package com.example.test.service;

import com.example.test.dto.FuelStationOwnerDTO;
import com.example.test.model.FuelStationOwner;
import com.example.test.repo.FuelStationOwnerRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FuelStationOwnerService {

    @Autowired
    private FuelStationOwnerRepo fuelStationOwnerRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<FuelStationOwnerDTO> getAllFuelStationOwners() {
        List<FuelStationOwner> fuelStationOwnerList = fuelStationOwnerRepo.findAll();
        return modelMapper.map(fuelStationOwnerList, new TypeToken<List<FuelStationOwnerDTO>>() {
        }.getType());
    }

    public FuelStationOwnerDTO saveFuelStationOwner(FuelStationOwnerDTO fuelStationOwnerDTO) {
        fuelStationOwnerRepo.save(modelMapper.map(fuelStationOwnerDTO, FuelStationOwner.class));
        return fuelStationOwnerDTO;
    }
}