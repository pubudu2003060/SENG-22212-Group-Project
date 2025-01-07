package com.example.test.service;

import com.example.test.dto.FuelStationDTO;
import com.example.test.model.FuelStation;
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

    public FuelStationDTO saveFuelStation(FuelStationDTO fuelStationDTO) {
        fuelStationRepo.save(modelMapper.map(fuelStationDTO, FuelStation.class));
        return fuelStationDTO;
    }
}
