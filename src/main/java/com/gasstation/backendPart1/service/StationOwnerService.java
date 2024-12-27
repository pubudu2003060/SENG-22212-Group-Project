package com.gasstation.backendPart1.service;

import com.gasstation.backendPart1.dataTransferObject.StationOwnerDTO;
import com.gasstation.backendPart1.model.StationOwner;
import com.gasstation.backendPart1.repo.StationOwnerRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class StationOwnerService {
    @Autowired
    private StationOwnerRepo stationOwnerRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<StationOwnerDTO> getAllStationOwners(){
        List<StationOwner> stationOwnersList = stationOwnerRepo.findAll();
        return modelMapper.map(stationOwnersList,new TypeToken<List<StationOwnerDTO>>(){}.getType());
    }

    public StationOwnerDTO saveStationOwner(StationOwnerDTO stationOwnerDTO) {
        stationOwnerRepo.save(modelMapper.map(stationOwnerDTO, StationOwner.class));
        return stationOwnerDTO;
    }

    public StationOwnerDTO updateStationOwner(StationOwnerDTO stationOwnerDTO) {
        stationOwnerRepo.save(modelMapper.map(stationOwnerDTO, StationOwner.class));
        return stationOwnerDTO;
    }


    public String deleteStationOwner(Integer ownerId) {
        stationOwnerRepo.deleteById(ownerId);
        return "deleted stationOwner successfully";
    }

}
