package com.example.test.controller;

import com.example.test.dto.AdminSignInDTO;
import com.example.test.dto.BuyquotaFuelStationDTO;
import com.example.test.enump.FuelType;
import com.example.test.service.AdminLayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api/v1")
@CrossOrigin
public class AdminLayerController {

    @Autowired
    private AdminLayerService adminLayerService;

    @GetMapping("/getBuyQuotasDataByFuelType/{fualType}")
    public Map<String, Double> getBuyQuotasDataByFuelType(@PathVariable("fualType") FuelType fuelType) {
        return adminLayerService.getBuyQuotasDataByFuelType(fuelType);
    }

    @GetMapping("/tranctionscountByFuelTypeandDate/{fuelType}/{date}")
    public int tranctionscountByFuelTypeandDate(
            @PathVariable("fuelType") String fuelType,
            @PathVariable("date") String dateString) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = dateFormat.parse(dateString);
            return adminLayerService.tranctionscountByFuelTypeandDate(fuelType, date);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format. Expected yyyy-MM-dd");
        }
    }

    @PostMapping("/adminsignin")
    public ResponseEntity<String> getAdminByUsernameandPassword(@RequestBody AdminSignInDTO adminSignInDTO) {
        return adminLayerService.adminSignIn(adminSignInDTO);
    }

    @GetMapping("admin/getfuelstationbuyquoto")
    public List<BuyquotaFuelStationDTO> getFuelStationBuyQuoto() {
        return adminLayerService.getFuelStationBuyQuoto();
    }
}
