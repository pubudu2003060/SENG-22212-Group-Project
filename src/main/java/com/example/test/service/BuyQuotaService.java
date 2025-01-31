package com.example.test.service;


import com.example.test.dto.BQDetailsDTO;
import com.example.test.dto.BuyQuatoVehicleDTO;
import com.example.test.dto.BuyQuotaDTO;
import com.example.test.dto.BuyquotaFuelStationDTO;
import com.example.test.enump.FuelType;
import com.example.test.model.BuyQuota;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.model.FuelStation;
import com.example.test.repo.BuyQuotaRepo;
import com.example.test.repo.CustomerFuelQuotaRepo;
import com.example.test.repo.FuelStationRepo;
import com.example.test.repo.VehicalRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class BuyQuotaService {

    @Autowired
    private BuyQuotaRepo buyQuotaRepo;

    @Autowired
    private CustomerFuelQuotaRepo customerFuelQuotaRepo;

    @Autowired
    private FuelStationRepo fuelStationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<BuyQuotaDTO> getAllbuyquota() {
        List<BuyQuota> buyQuotaList = buyQuotaRepo.findAll();
        return modelMapper.map(buyQuotaList, new TypeToken<List<BuyQuotaDTO>>() {
        }.getType());
    }

    public BuyQuotaDTO saveBuyQuota(BuyQuotaDTO buyQuotaDTO) {
        BuyQuota buyQuota = buyQuotaRepo.save(modelMapper.map(buyQuotaDTO, BuyQuota.class));
        return modelMapper.map(buyQuota, BuyQuotaDTO.class);
    }

    public List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(int customerId) {
        return buyQuotaRepo.getBuyQuotosByVehical(customerId);
    }

    public List<BuyQuota> getBuyQuotasByFuelType(FuelType fuelType) {
        List<BuyQuota> buyQuotaList = buyQuotaRepo.getBuyQuotasByFuelType(fuelType);
        return buyQuotaList;
    }

    public int countByFuelTypeByDate(String fuelType, Date date) {
        return buyQuotaRepo.countByFuelTypeAndDate(fuelType, date);
    }

    public List<BuyquotaFuelStationDTO> getFuelStationBuyQuoto() {

        List<BuyQuota> buyQuota = buyQuotaRepo.findAll();
        List<BuyquotaFuelStationDTO> buyquotaFuelStationDTOList = new ArrayList<>();

        for (BuyQuota buyQuota1 : buyQuota) {
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


    public BuyQuota saveBQuyQuota(@RequestBody BQDetailsDTO bqDetailsDTO) {


        BuyQuotaDTO buyQuotaDTO1 = new BuyQuotaDTO();

        buyQuotaDTO1.setAmount(bqDetailsDTO.getAmount());
        buyQuotaDTO1.setDate(new Date());
        buyQuotaDTO1.setFuelType(bqDetailsDTO.getFuelType());
        FuelStation fuelStation = fuelStationRepo.getFuelStationByRegisteredId(bqDetailsDTO.getRegisteredId());
        buyQuotaDTO1.setFuelStation(fuelStation);
        CustomerFuelQuota  customerFuelQuota = customerFuelQuotaRepo.getCustomerFuelQuotaByCustomerFuelQuotaId(bqDetailsDTO.getCustomerFuelQuotaId());
        buyQuotaDTO1.setVehical(customerFuelQuota.getVehical());
        buyQuotaDTO1.setUser(customerFuelQuota.getUser());

        BuyQuota buyQuota = buyQuotaRepo.save(modelMapper.map(buyQuotaDTO1, BuyQuota.class));


        return buyQuota;
    }

}
