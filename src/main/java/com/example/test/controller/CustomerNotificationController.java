package com.example.test.controller;

import com.example.test.dto.CustomerNotificationDTO;
import com.example.test.service.CustomerNotificationservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class CustomerNotificationController {

    @Autowired
    private CustomerNotificationservice customerNotificationservice;

    @GetMapping("/getcustomernotifications")
    public List<CustomerNotificationDTO> getAllStations() {
        return customerNotificationservice.getAllCustomerNotifications();
    }

    @PostMapping("/addcustomernotifications")
    public CustomerNotificationDTO saveStation(@RequestBody CustomerNotificationDTO customerNotificationDTO) {
        return customerNotificationservice.saveStation( customerNotificationDTO );
    }
}
