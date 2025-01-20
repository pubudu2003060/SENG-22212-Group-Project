package com.example.test.controller;

import com.example.test.model.EligibleFuelCapacity;
import com.example.test.service.ScanDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class ScanDetailsController {

    @Autowired
    private ScanDetailsService scanDetailsService;

    @GetMapping("/getScannedDetails")
    public String getScannedDetails() {
        return scanDetailsService.getScannedDetails();
    }
    @PutMapping("/setGivenFuel/{qrCodeId}")
    public String setGivenFuel(@PathVariable int qrCodeId,@RequestParam Float givenFuel) {
        try{
            return scanDetailsService.setGivenFuel(qrCodeId,givenFuel);
        }
        catch(IllegalArgumentException e){
            return "Error: "+e.getMessage();

        }
    }
}