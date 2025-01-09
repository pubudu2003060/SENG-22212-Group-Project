package com.example.test.service;

import com.example.test.dto.VehicalDTO;
import com.example.test.dto.VehicalFualDataDTO;
import com.example.test.dto.VehicalFualQuataDTO;
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
}
