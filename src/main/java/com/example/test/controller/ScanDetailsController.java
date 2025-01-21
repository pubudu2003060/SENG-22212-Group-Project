package com.example.test.controller;

import com.example.test.dto.ScannedDetailsDTO;
import com.example.test.model.EligibleFuelCapacity;
import com.example.test.model.Qrcode;
import com.example.test.repo.QrcodeRepo;
import com.example.test.service.ScanDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class ScanDetailsController {

    @Autowired
    private ScanDetailsService scanDetailsService;
    @Autowired
    private QrcodeRepo qrcodeRepo;

    //@PutMapping("/allocateFuel")
    //public String allocateFuel(@RequestBody ScannedDetailsDTO scannedDetailsDTO) {
      //return scanDetailsService.allocateFuel(scannedDetailsDTO);
    //}
}