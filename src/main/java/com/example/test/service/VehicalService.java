package com.example.test.service;

import com.example.test.dto.VehicalDTO;
import com.example.test.dto.VehicalFualDataDTO;
import com.example.test.model.Vehical;
import com.example.test.repo.VehicalRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicalService {

    @Autowired
    private VehicalRepo vehicalRepo;

    @Autowired
    private ModelMapper modelMapper;

    public VehicalDTO addVehical(VehicalDTO vehicalDTO) {
        vehicalRepo.save(modelMapper.map(vehicalDTO, Vehical.class));

        return vehicalDTO;
    }

    public List<VehicalDTO> getAllVehicals() {
        List<Vehical> vehicals = vehicalRepo.findAll();
        List<VehicalDTO> vehicalDTOS = new ArrayList<>();
        for (Vehical vehical : vehicals) {
            vehicalDTOS.add(modelMapper.map(vehical, VehicalDTO.class));
        }
        return vehicalDTOS;
    }

    public List<VehicalFualDataDTO> getvehicalFualData(int customerId){
        return vehicalRepo.getvehicalFualData(customerId);
    }
    public Long getVehicleCount(){
        return vehicalRepo.getTotalVehicles();
    }




}
