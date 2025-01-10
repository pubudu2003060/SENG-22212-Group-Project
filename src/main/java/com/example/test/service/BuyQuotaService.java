package com.example.test.service;


import com.example.test.dto.BuyQuatoVehicleDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.model.BuyQuota;
import com.example.test.repo.BuyQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class BuyQuotaService {

    @Autowired
    private BuyQuotaRepo buyQuotaRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<BuyQuotaDTO> getAllbuyquota() {
        List<BuyQuota> buyQuotaList = buyQuotaRepo.findAll();
        return modelMapper.map(buyQuotaList, new TypeToken<List<BuyQuotaDTO>>() {
        }.getType());
    }

    public BuyQuotaDTO saveBuyQuota(BuyQuotaDTO buyQuotaDTO) {
        buyQuotaRepo.save(modelMapper.map(buyQuotaDTO, BuyQuota.class));
        return buyQuotaDTO;
    }

    public List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(int customerId){
        return buyQuotaRepo.getBuyQuotosByVehical(customerId);
    }

    public List<BuyQuota> getBuyQuotasByFuelType(String fuelType){
        return buyQuotaRepo.getBuyQuotasByFuelType(fuelType);
    }


}
