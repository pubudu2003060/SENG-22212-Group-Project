package com.example.test.service;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.repo.CustomerFuelQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
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
}
