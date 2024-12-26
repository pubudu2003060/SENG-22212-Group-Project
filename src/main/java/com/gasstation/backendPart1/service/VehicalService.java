package com.gasstation.backendPart1.service;


import com.gasstation.backendPart1.dataTransferObject.UserDTO;
import com.gasstation.backendPart1.dataTransferObject.VehicalDTO;
import com.gasstation.backendPart1.model.User;
import com.gasstation.backendPart1.model.Vehical;
import com.gasstation.backendPart1.repo.VehicalRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class VehicalService {

    @Autowired
    private VehicalRepo vehicalRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<VehicalDTO> getAllVehical(){
        List<Vehical> vehicalList = vehicalRepo.findAll();
        return modelMapper.map(vehicalList,new TypeToken<List<VehicalDTO>>(){}.getType());
    }

    public VehicalDTO saveVehical(VehicalDTO vehicalDTO) {
        vehicalRepo.save(modelMapper.map(vehicalDTO, Vehical.class));
        return vehicalDTO;
    }

    public VehicalDTO updateVehical(VehicalDTO vehicalDTO) {
        vehicalRepo.save(modelMapper.map(vehicalDTO, Vehical.class));
        return vehicalDTO;
    }


    public String deleteVehical(Integer vehicalId) {
        vehicalRepo.deleteById(vehicalId);
        return "deleted user successfully";
    }


}
