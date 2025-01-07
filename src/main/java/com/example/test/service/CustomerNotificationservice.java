package com.example.test.service;

import com.example.test.dto.CustomerNotificationDTO;
import com.example.test.model.CustomerNotification;
import com.example.test.repo.CustomerNotificationRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CustomerNotificationservice {

    @Autowired
    private CustomerNotificationRepo customerNotificationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<CustomerNotificationDTO> getAllCustomerNotifications() {
        List<CustomerNotification> stationsList = customerNotificationRepo.findAll();
        return modelMapper.map(stationsList, new TypeToken<List<CustomerNotificationDTO>>() {
        }.getType());
    }

    public CustomerNotificationDTO saveStation(CustomerNotificationDTO customerNotificationDTO) {
        customerNotificationRepo.save(modelMapper.map(customerNotificationDTO, CustomerNotification.class));
        return customerNotificationDTO;
    }

}
