package com.gasstation.backendPart1.controller;

import com.gasstation.backendPart1.dataTransferObject.CustomerFuelQuotaDTO;
import com.gasstation.backendPart1.dataTransferObject.CustomerNotificationDTO;
import com.gasstation.backendPart1.service.CustomerFuelQuotaService;
import com.gasstation.backendPart1.service.CustomerNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class CustomerNotificationController {
    @Autowired
    private CustomerNotificationService customerNotificationService;

    @GetMapping("/getcustomernotification")
    public List<CustomerNotificationDTO> getAllCustomerNotifications() {
        return customerNotificationService.getAllCustomerNotifications();
    }

    @PostMapping("/addcustomernotification")
    public CustomerNotificationDTO saveCustomerNotification(@RequestBody CustomerNotificationDTO customerNotificationDTO) {
        return customerNotificationService.saveCustomerNotification(customerNotificationDTO);
    }

    @PutMapping("/updatecustomerNOTIFICATION")
    public CustomerNotificationDTO updateCustomerNotification(@RequestBody CustomerNotificationDTO customerNotificationDTO) {
        return customerNotificationService.updateCustomerNotification(customerNotificationDTO);
    }

    @DeleteMapping("/deletecustomernotification/{customerNotificationId}")
    public String deleteCustomerNotification(@PathVariable Integer customerNotificationId) {
        return customerNotificationService.deleteCustomerNotification(customerNotificationId);
    }
}
