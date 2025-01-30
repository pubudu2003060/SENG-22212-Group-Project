package com.example.test.service;


import com.example.test.dto.BuyQuatoVehicleDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.dto.BuyquotaFuelStationDTO;
import com.example.test.model.BuyQuota;
import com.example.test.repo.BuyQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(int customerId) {
        return buyQuotaRepo.getBuyQuotosByVehical(customerId);
    }

    public List<BuyQuota> getBuyQuotasByFuelType(String fuelType) {
        List<BuyQuota> buyQuotaList = buyQuotaRepo.getBuyQuotasByFuelType(fuelType);
        return buyQuotaList;
    }

    public int countByFuelTypeByDate(String fuelType, Date date) {
        return buyQuotaRepo.countByFuelTypeAndDate(fuelType, date);
    }

    public List<BuyquotaFuelStationDTO> getFuelStationBuyQuoto() {

        List<BuyQuota> buyQuota = buyQuotaRepo.findAll();
        List<BuyquotaFuelStationDTO> buyquotaFuelStationDTOList = new ArrayList<>();

        for(BuyQuota buyQuota1:buyQuota){
            BuyquotaFuelStationDTO buyquotaFuelStationDTO = new BuyquotaFuelStationDTO();

            buyquotaFuelStationDTO.setBqId(buyQuota1.getBqId());
            buyquotaFuelStationDTO.setAmount(buyQuota1.getAmount());
            buyquotaFuelStationDTO.setDate(buyQuota1.getDate());
            buyquotaFuelStationDTO.setFuelType(buyQuota1.getFuelType());
            buyquotaFuelStationDTO.setStationId(buyQuota1.getFuelStation().getStationId());
            buyquotaFuelStationDTO.setStationType(buyQuota1.getFuelStation().getStationType());

            buyquotaFuelStationDTOList.add(buyquotaFuelStationDTO);

        }
        return buyquotaFuelStationDTOList;
    }


}
