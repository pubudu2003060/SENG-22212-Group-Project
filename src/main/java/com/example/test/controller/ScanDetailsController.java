package com.example.test.controller;

import com.example.test.model.EligibleFuelCapacity;
import com.example.test.service.ScanDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}