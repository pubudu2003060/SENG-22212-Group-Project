package com.example.test.service;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.FuelStationManagementDTO;
import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.model.BuyQuota;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.repo.CustomerFuelQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CustomerFualQuataService {

    @Autowired
    private CustomerFuelQuotaRepo customerFuelQuotaRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<CustomerFuelQuotaDTO> getAllCustomerFuelQuotas() {
        List<CustomerFuelQuota> customerFuelQuotaList = customerFuelQuotaRepo.findAll();
        return modelMapper.map(customerFuelQuotaList, new TypeToken<List<CustomerFuelQuotaDTO>>() {
        }.getType());
    }

    public CustomerFuelQuotaDTO saveCustomerFuelQuota(CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        customerFuelQuotaRepo.save(modelMapper.map(customerFuelQuotaDTO, CustomerFuelQuota.class));
        return customerFuelQuotaDTO;
    }

    public List<VehicalFualQuataDTO> getVehicalFualQuata(int customerId){
        return customerFuelQuotaRepo.getVehicalFualQuata(customerId);
    }


    @Scheduled(cron="0 0 0 * * MON")
    public void resetAllQuotas(){
        List<CustomerFuelQuota> customerFuelQuotaList = customerFuelQuotaRepo.findAll();
        for(CustomerFuelQuota customerFuelQuota : customerFuelQuotaList){
            customerFuelQuota.setRemainFuel(customerFuelQuota.getEligibleFuelQuota());
            customerFuelQuotaRepo.save(customerFuelQuota);
        }
        System.out.println("Reset all fuel quotas");

    }

    public CustomerFuelQuotaDTO getFuelQuotaDetails(int id){
        CustomerFuelQuota customerFuelQuota=customerFuelQuotaRepo.findById(id).orElseThrow(()->new IllegalArgumentException("Fuel quota not found for id: "+id));
        return modelMapper.map(customerFuelQuota, CustomerFuelQuotaDTO.class);
    }

    public CustomerFuelQuotaDTO searchFuelQuotaById(int vehicleId){
        CustomerFuelQuotaDTO customerFuelQuota= modelMapper.map(customerFuelQuotaRepo.getCustomerFuelQuotaByVehical_VehicalId(vehicleId),CustomerFuelQuotaDTO.class);
        return customerFuelQuota;
    }

    public String updateFuelQuota(String fuelType,int newFuelQuota){
        List<CustomerFuelQuota> customerFuelQuotaList = customerFuelQuotaRepo.findByVehicleType(fuelType);
        for(CustomerFuelQuota customerFuelQuota : customerFuelQuotaList){
            customerFuelQuota.setEligibleFuelQuota(newFuelQuota);
            customerFuelQuotaRepo.save(customerFuelQuota);


        }

        return "Updated fuel quota to" + newFuelQuota +"for"+customerFuelQuotaList.size()+"vehicle of type"+fuelType+".";

    }


}
