package com.example.test.service;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.repo.CustomerFuelQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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

    public CustomerFuelQuotaDTO searchFuelQuotaByVehicleId(int vehicleId){
        CustomerFuelQuotaDTO customerFuelQuota=customerFuelQuotaRepo.findByVehicalId(vehicleId).orElseThrow(()->new IllegalArgumentException("Fuel quota not found for id: "+vehicleId));
        return modelMapper.map(customerFuelQuota, CustomerFuelQuotaDTO.class);
    }


}
