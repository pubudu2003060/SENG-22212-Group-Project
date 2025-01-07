package com.example.test.controller;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.service.CustomerFualQuataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class CustomerFuelQuotaController {

    @Autowired
    CustomerFualQuataService customerFualQuataService;

    @GetMapping("/getcustomerquota")
    public List<CustomerFuelQuotaDTO> getAllCustomerFuelQuotas() {
        return customerFualQuataService.getAllCustomerFuelQuotas();
    }

    @PostMapping("/addcustomerquota")
    public CustomerFuelQuotaDTO saveCustomerFuelQuota(@RequestBody CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        return customerFualQuataService.saveCustomerFuelQuota(customerFuelQuotaDTO);
    }
}
