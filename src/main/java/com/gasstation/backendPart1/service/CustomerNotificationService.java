package com.gasstation.backendPart1.service;

import com.gasstation.backendPart1.dataTransferObject.AminDTO;
import com.gasstation.backendPart1.dataTransferObject.CustomerNotificationDTO;
import com.gasstation.backendPart1.model.Admin;
import com.gasstation.backendPart1.model.CustomerNotification;
import com.gasstation.backendPart1.repo.AdminRepo;
import com.gasstation.backendPart1.repo.CustomerNotificationRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CustomerNotificationService {
    @Autowired
    private CustomerNotificationRepo customerNotificationRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<CustomerNotificationDTO> getAllCustomerNotifications() {
        List<CustomerNotification> customerNotificationsList = customerNotificationRepo.findAll();
        return modelMapper.map(customerNotificationsList, new TypeToken<List<CustomerNotificationDTO>>() {
        }.getType());
    }

    public CustomerNotificationDTO saveCustomerNotification(CustomerNotificationDTO customerNotificationDTO) {
        customerNotificationRepo.save(modelMapper.map(customerNotificationDTO, CustomerNotification.class));
        return customerNotificationDTO;
    }

    public CustomerNotificationDTO updateCustomerNotification(CustomerNotificationDTO customerNotificationDTO) {
        customerNotificationRepo.save(modelMapper.map(customerNotificationDTO, CustomerNotification.class));
        return customerNotificationDTO;
    }

    public String deleteCustomerNotification(Integer customerNotificationId) {
        customerNotificationRepo.deleteById(customerNotificationId);
        return "Deleted customer notification successfully";
    }
}
