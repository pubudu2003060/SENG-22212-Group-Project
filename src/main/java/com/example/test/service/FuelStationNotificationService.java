package com.example.test.service;

import com.example.test.dto.FuelStationNotificationDTO;
import com.example.test.model.FuelStationNotification;
import com.example.test.repo.FuelStationNotificationRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FuelStationNotificationService {

    @Autowired
    private FuelStationNotificationRepo fuelStationNotificationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<FuelStationNotificationDTO> getAllFuelStationNotifications() {
        List<FuelStationNotification> notifications = fuelStationNotificationRepo.findAll();
        return modelMapper.map(notifications, new TypeToken<List<FuelStationNotificationDTO>>() {
        }.getType());
    }

    public FuelStationNotificationDTO saveFuelStationNotification(FuelStationNotificationDTO notificationDTO) {
        fuelStationNotificationRepo.save(modelMapper.map(notificationDTO, FuelStationNotification.class));
        return notificationDTO;
    }
}
