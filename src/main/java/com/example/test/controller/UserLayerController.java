package com.example.test.controller;

import com.example.test.dto.VehicalDTO;
import com.example.test.dto.VehicalFualDataDTO;
import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.service.UserLayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class UserLayerController {

    @Autowired
    private UserLayerService userLayerService;

    @GetMapping("/getallvehicalsbycustomerid/{customerid}")
    public List<VehicalDTO> getAllVehicalsByCustomerId(@PathVariable("customerid") int customerID) {
        return userLayerService.getAllVehicalsByCustomerId(customerID);
    }

    @GetMapping("/getvehicalfualdata/{customerid}")
    public List<VehicalFualDataDTO> getvehicalFualData(@PathVariable("customerid") int customerID){
        return userLayerService.getVehicalFualdata(customerID);
    }

    @GetMapping("/getVehicalFualQuata/{customerid}")
    public List<VehicalFualQuataDTO> getVehicalFualQuata(@PathVariable("customerid") int customerID){
        return userLayerService.getVehicalFualQuata(customerID);
    }
}
