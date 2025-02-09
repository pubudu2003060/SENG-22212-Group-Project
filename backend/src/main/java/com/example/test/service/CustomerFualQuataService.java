package com.example.test.service;

import com.example.test.dto.*;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.enump.VehicalType;
import com.example.test.repo.CustomerFuelQuotaRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        CustomerFuelQuota customerFuelQuota = customerFuelQuotaRepo.save(modelMapper.map(customerFuelQuotaDTO, CustomerFuelQuota.class));
        return modelMapper.map(customerFuelQuota, CustomerFuelQuotaDTO.class);
    }

    public List<VehicalFualQuataDTO> getVehicalFualQuata(int customerId) {
        return customerFuelQuotaRepo.getVehicalFualQuata(customerId);
    }


    @Scheduled(cron = "0 0 0 * * MON")
    public void resetAllQuotas() {
        List<CustomerFuelQuota> customerFuelQuotaList = customerFuelQuotaRepo.findAll();
        for (CustomerFuelQuota customerFuelQuota : customerFuelQuotaList) {
            customerFuelQuota.setRemainFuel(customerFuelQuota.getEligibleFuelQuota());
            customerFuelQuotaRepo.save(customerFuelQuota);
        }
        System.out.println("Reset all fuel quotas");

    }

    public Integer getFuelQuotaDetailsByVehicleType(VehicalType vehicleType) {
        Integer customerFuelQuota = customerFuelQuotaRepo.findEligibleFuelCapacityByVehicleType(vehicleType);
        return customerFuelQuota;
    }

    public CustomerFuelQuotaDTO searchFuelQuotaById(int vehicleId) {
        CustomerFuelQuotaDTO customerFuelQuota = modelMapper.map(customerFuelQuotaRepo.getCustomerFuelQuotaByVehical_VehicalId(vehicleId), CustomerFuelQuotaDTO.class);
        return customerFuelQuota;
    }


    public String updateFuelQuota(VehicalType vehicleType, int newFuelQuota) {
        List<CustomerFuelQuota> customerFuelQuotaList = customerFuelQuotaRepo.findByVehicleType(vehicleType);
        for (CustomerFuelQuota customerFuelQuota : customerFuelQuotaList) {
            customerFuelQuota.setEligibleFuelQuota(newFuelQuota);
            customerFuelQuotaRepo.save(customerFuelQuota);

        }

        return "Updated fuel quota to" + newFuelQuota + "for" + customerFuelQuotaList.size() + "vehicle of type" + vehicleType + ".";

    }

    public ScannedQRCodeDTO getScannedDetails(int customerFuelQuotaId) {

        CustomerFuelQuota customerFuelQuota = customerFuelQuotaRepo.findById(customerFuelQuotaId).orElseThrow(() -> new IllegalArgumentException("customer fuel Quota id not found" + customerFuelQuotaId));

        ScannedQRCodeDTO scannedQRCodeDTO = new ScannedQRCodeDTO();
        scannedQRCodeDTO.setVehicleNo(customerFuelQuota.getVehical().getVehicalNo());
        scannedQRCodeDTO.setVehicalType(customerFuelQuota.getVehical().getVehicalType());
        scannedQRCodeDTO.setRemainFuel(customerFuelQuota.getEligibleFuelQuota());
        scannedQRCodeDTO.setEligibleDays(customerFuelQuota.getEligibleDays());
        return scannedQRCodeDTO;
    }

    public String allocateFuel(int customerFuelQuotaId, int allocatedFuel) {
        CustomerFuelQuota customerFuelQuota = customerFuelQuotaRepo.findById(customerFuelQuotaId).orElseThrow(() -> new IllegalArgumentException("customer fuel quota id is not found" + customerFuelQuotaId));
        if (allocatedFuel > customerFuelQuota.getRemainFuel()) {
            throw new IllegalArgumentException("allocated Quota exceed the remaining fuel capacity");
        }
        customerFuelQuota.setRemainFuel(customerFuelQuota.getRemainFuel() - allocatedFuel);
        customerFuelQuotaRepo.save(customerFuelQuota);

        return "Fuel allocated successfully! Remain capacity: " + customerFuelQuota.getRemainFuel() + " liters";
    }


    public Object getDetailsbycfcid(@RequestParam int customerFuelQuotaId) {
        try {
            QrCodeScanDetailsDTO qrCodeScanDetailsDTO = customerFuelQuotaRepo.getQrCodeScanDetailsDTO(customerFuelQuotaId);
            return qrCodeScanDetailsDTO;
        } catch (Exception e) {
            return "Error getting data";
        }
    }

    public Object updateCustomerFueeldata(int customerFuelQuotaId, int remainFuel) {
        try {
            Object object = customerFuelQuotaRepo.updateCustomerFueeldata(customerFuelQuotaId, remainFuel);
            return object;
        } catch (Exception e) {
            return "Error updating customer fuel quota"+e.getMessage();
        }
    }


}
