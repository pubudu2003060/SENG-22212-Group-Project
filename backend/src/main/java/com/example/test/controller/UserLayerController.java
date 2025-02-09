package com.example.test.controller;

import com.example.test.dto.*;
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


    @GetMapping("/user/getVehicalFualQuata/{customerid}")
    public List<VehicalFualQuataDTO> getVehicalFualQuata(@PathVariable("customerid") int customerID){
        return userLayerService.getVehicalFualQuata(customerID);
    }

    @GetMapping("/user/getBuyQuotosByVehical/{customerid}")
    public List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(@PathVariable("customerid") int customerId){
        return userLayerService.getBuyQuotosByVehical(customerId);
    }


    @GetMapping("/user/generateQrCodeByVehicalId/{vehicalid}")
    public byte[] generateQrCodeByVehicalId(@PathVariable("vehicalid") String vehicalId) {

        return userLayerService.generateQrCode(vehicalId);
    }

    @GetMapping("/generateQRCodeImageByVehicalId/{vehicalid}")
    public String generateQRCodeImage(@PathVariable("vehicalid") int vehicalId) {
        return userLayerService.generateQRCodeImage(vehicalId);
    }

    @PostMapping("/user/updateuser")
    public Object updateUser(@RequestBody  UserDto userDTO) {
        return userLayerService.updateUser(userDTO);
    }

}
