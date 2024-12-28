package com.gasstation.backendPart1.controller;

import com.gasstation.backendPart1.dataTransferObject.AminDTO;
import com.gasstation.backendPart1.dataTransferObject.CustomerFuelQuotaDTO;
import com.gasstation.backendPart1.service.AdminService;
import com.gasstation.backendPart1.service.CustomerFuelQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")

public class CustomerFuelQuotaController {
    @Autowired
    private CustomerFuelQuotaService customerFuelQuotaService;

    @GetMapping("/getcustomerquota")
    public List<CustomerFuelQuotaDTO> getAllCustomerFuelQuotas() {
        return customerFuelQuotaService.getAllCustomerFuelQuotas();
    }

    @PostMapping("/addcustomerquota")
    public CustomerFuelQuotaDTO saveCustomerFuelQuota(@RequestBody CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        return customerFuelQuotaService.saveCustomerFuelQuota(customerFuelQuotaDTO);
    }

    @PutMapping("/updatecustomerquota")
    public CustomerFuelQuotaDTO updateCustomerFuelQuota(@RequestBody CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        return customerFuelQuotaService.updateCustomerFuelQuota(customerFuelQuotaDTO);
    }

    @DeleteMapping("/deletecustomerquota/{customerFuelQuotaId}")
    public String deleteCustomerFuelQuota(@PathVariable Integer customerFuelQuotaId) {
        return customerFuelQuotaService.deleteCustomerFuelQuota(customerFuelQuotaId);
    }
}
