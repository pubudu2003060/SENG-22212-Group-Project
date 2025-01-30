package com.example.test.controller;

import com.example.test.dto.FuelStationNotificationDTO;
import com.example.test.service.FuelStationNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1")
public class FuelStationNotificationController {

    @Autowired
    private FuelStationNotificationService fuelStationNotificationService;

    @GetMapping("/getfualstationnotifications")
    public List<FuelStationNotificationDTO> getAllFuelStationNotifications() {
        return fuelStationNotificationService.getAllFuelStationNotifications();
    }

    @PostMapping("/addfualstationnotification")
    public FuelStationNotificationDTO saveFuelStationNotification(@RequestBody FuelStationNotificationDTO notificationDTO) {
        return fuelStationNotificationService.saveFuelStationNotification(notificationDTO);
    }
}
