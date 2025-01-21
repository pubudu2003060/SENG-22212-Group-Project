package com.example.test.controller;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.ScannedQRCodeDTO;
import com.example.test.model.VehicalType;
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

    @PutMapping("/updateFuelQuotaByVehicleType")
    public String updateCustomerFuelQuota(@RequestParam("vehicleType") String vehicleType, @RequestParam("fuelQuantity") Integer fuelQuantity) {
        return customerFualQuataService.updateFuelQuota(vehicleType,fuelQuantity);
    }

    @GetMapping("/getFuelQuotaByVehicleType")
    public Integer getFuelQuotaDetailsByVehicleType(@RequestParam("vehicalType") VehicalType vehicalType) {
        return customerFualQuataService.getFuelQuotaDetailsByVehicleType(vehicalType);
    }

    @GetMapping("/getQRCodeContent")
    public ScannedQRCodeDTO getQRCodeContent(@RequestParam("customerFuelQuotaId") int customerFuelQuotaId) {
        return customerFualQuataService.getScannedDetails(customerFuelQuotaId);
    }
}
