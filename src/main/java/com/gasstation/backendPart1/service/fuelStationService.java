package com.gasstation.backendPart1.service;

import com.gasstation.backendPart1.dataTransferObject.StationDTO;
import com.gasstation.backendPart1.model.fuelStation;
import com.gasstation.backendPart1.repo.fuelStationRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class fuelStationService {

    @Autowired
    private fuelStationRepo fuelStationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<StationDTO> getAllStations() {
        List<fuelStation> stationsList = fuelStationRepo.findAll();
        return modelMapper.map(stationsList, new TypeToken<List<StationDTO>>() {
        }.getType());
    }

    public StationDTO saveStation(StationDTO stationDTO) {
        fuelStationRepo.save(modelMapper.map(stationDTO, fuelStation.class));
        return stationDTO;
    }

    public StationDTO updateStation(StationDTO stationDTO) {
        fuelStationRepo.save(modelMapper.map(stationDTO, fuelStation.class));
        return stationDTO;
    }

    public String deleteStation(Integer stationId) {
        fuelStationRepo.deleteById(stationId);
        return "Deleted station successfully";
    }
}
