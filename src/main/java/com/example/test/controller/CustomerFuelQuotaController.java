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

    @GetMapping("/getallcustomerquota")
    public List<CustomerFuelQuotaDTO> getAllCustomerFuelQuotas() {
        return customerFualQuataService.getAllCustomerFuelQuotas();
    }

    @PostMapping("/addcustomerquota")
    public CustomerFuelQuotaDTO saveCustomerFuelQuota(@RequestBody CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        return customerFualQuataService.saveCustomerFuelQuota(customerFuelQuotaDTO);
    }

    @PutMapping("/updateFuelQuota")
    public String updateCustomerFuelQuota(@RequestParam("fuelType") String fuelType, @RequestParam("fuelQuantity") Integer fuelQuantity) {
        return customerFualQuataService.updateFuelQuota(fuelType,fuelQuantity);
    }

    @GetMapping("/searchFuelQuota")
    public CustomerFuelQuotaDTO searchFuelQuota(@RequestParam("vehiclId") int vehicleId) {
        return customerFualQuataService.searchFuelQuotaById(vehicleId);
    }
}
