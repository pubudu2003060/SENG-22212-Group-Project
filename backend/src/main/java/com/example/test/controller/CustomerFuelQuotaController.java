package com.example.test.controller;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.QrCodeScanDetailsDTO;
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

    @GetMapping("/admin/getallcustomerquota")
    public List<CustomerFuelQuotaDTO> getAllCustomerFuelQuotas() {
        return customerFualQuataService.getAllCustomerFuelQuotas();
    }

    @PostMapping("/addcustomerquota")
    public CustomerFuelQuotaDTO saveCustomerFuelQuota(@RequestBody CustomerFuelQuotaDTO customerFuelQuotaDTO) {
        return customerFualQuataService.saveCustomerFuelQuota(customerFuelQuotaDTO);
    }

    @PutMapping("/updateFuelQuotaByVehicleType")
    public String updateCustomerFuelQuota(@RequestParam("vehicleType") VehicalType vehicleType, @RequestParam("fuelQuantity") Integer fuelQuantity) {
        return customerFualQuataService.updateFuelQuota(vehicleType, fuelQuantity);
    }

    @GetMapping("/admin/getFuelQuotaByVehicleType")
    public Integer getFuelQuotaDetailsByVehicleType(@RequestParam("vehicalType") VehicalType vehicalType) {
        return customerFualQuataService.getFuelQuotaDetailsByVehicleType(vehicalType);
    }

    @GetMapping("/getQRCodeContent")
    public ScannedQRCodeDTO getQRCodeContent(@RequestParam("customerFuelQuotaId") int customerFuelQuotaId) {
        return customerFualQuataService.getScannedDetails(customerFuelQuotaId);
    }

    @PutMapping("fuelstation/allocateFuel")
    public String allocateFuel(@RequestParam int customerFuelQuotaId, @RequestParam int allocatedFuel) {
        return customerFualQuataService.allocateFuel(customerFuelQuotaId, allocatedFuel);
    }

    @GetMapping("/fuelstation/getDetailsbycfcid")
    public Object getDetailsbycfcid(@RequestParam("customerFuelQuotaId") int customerFuelQuotaId) {
        try {
            Object object = customerFualQuataService.getDetailsbycfcid(customerFuelQuotaId);
            return object;
        } catch (Exception e) {
            return "Error getting data"+e.getMessage();
        }
    }

    @GetMapping("/fuelstation/updateCustomerFueldata/{customerFuelQuotaId}/{remainFuel}")
    public Object updateCustomerFueeldata(@PathVariable int customerFuelQuotaId,@PathVariable int remainFuel) {
        try {
            return customerFualQuataService.updateCustomerFueeldata(customerFuelQuotaId, remainFuel);
        } catch (Exception e) {
            return "Error updating customer fuel quota: "+e.getMessage();
        }
    }

}
