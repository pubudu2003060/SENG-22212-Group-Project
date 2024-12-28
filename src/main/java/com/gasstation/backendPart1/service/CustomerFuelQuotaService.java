package com.gasstation.backendPart1.service;

import com.gasstation.backendPart1.dataTransferObject.AminDTO;
import com.gasstation.backendPart1.dataTransferObject.CustomerFuelQuotaDTO;
import com.gasstation.backendPart1.model.Admin;
import com.gasstation.backendPart1.model.CustomerFuelQuota;
import com.gasstation.backendPart1.repo.AdminRepo;
import com.gasstation.backendPart1.repo.CustomerFuelQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CustomerFuelQuotaService {
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

    public CustomerFuelQuotaDTO updateCustomerFuelQuota(CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        customerFuelQuotaRepo.save(modelMapper.map(customerFuelQuotaDTO, CustomerFuelQuota.class));
        return customerFuelQuotaDTO;
    }

    public String deleteCustomerFuelQuota(Integer customerFuelQuotaId) {
        customerFuelQuotaRepo.deleteById(customerFuelQuotaId);
        return "Deleted customer fuel quota successfully";
    }
}
