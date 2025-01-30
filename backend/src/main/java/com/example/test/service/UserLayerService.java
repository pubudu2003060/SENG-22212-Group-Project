package com.example.test.service;

import com.example.test.dto.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserLayerService {

    @Autowired
    private VehicalService vehicalService;
    @Autowired
    private BuyQuotaService buyQuotaService;
    @Autowired
    private CustomerFualQuataService customerFualQuataService;
    @Autowired
    private QrcodeGeneraterService qrcodeGeneraterService;
    @Autowired
    private UserService userService;

    public List<VehicalDTO> getAllVehicalsByCustomerId(int customerId) {
        List<VehicalDTO> allVehicals = vehicalService.getAllVehicals();
        List<VehicalDTO> vehicalDTOS = new ArrayList<>();
        for (VehicalDTO vehical : allVehicals) {
            if (vehical.getUser().getUserId() == customerId) {
                vehicalDTOS.add(vehical);
            }
        }
        return vehicalDTOS;
    }

    public List<VehicalFualDataDTO> getVehicalFualdata(int customerId) {
        return vehicalService.getvehicalFualData(customerId);
    }

    public List<VehicalFualQuataDTO> getVehicalFualQuata(int customerId){
        return customerFualQuataService.getVehicalFualQuata(customerId);
    }

    public List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(int customerId){
        return buyQuotaService.getBuyQuotosByVehical(customerId);
    }

    public byte[] generateQrCode(String vehicalId) {
        return qrcodeGeneraterService.generateQrCode(vehicalId);
    }

    public String generateQRCodeImage(String vehicalId) {
        return qrcodeGeneraterService.generateQRCodeImage(vehicalId);
    }

    public Object updateUser(UserDto userDTO) {
        return userService.updateUser(userDTO);
    }
}
