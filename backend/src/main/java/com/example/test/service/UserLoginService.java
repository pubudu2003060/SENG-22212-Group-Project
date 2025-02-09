package com.example.test.service;

import com.example.test.dto.*;
import com.example.test.enump.VehicalEligibleData;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.model.User;
import com.example.test.model.UserLogin;
import com.example.test.model.Vehical;
import com.example.test.repo.UserLoginRepo;
import com.example.test.repo.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserLoginService {

    @Autowired
    private UserLoginRepo userLoginRepo;
    @Autowired
    private OtpGenerateService otpGenerateService;
    @Autowired
    private TwilioSmsService twilioSmsService;
    @Autowired
    private VehicalService vehicalService;
    @Autowired
    private CustomerFualQuataService customerFualQuataService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private QrcodeService qrcodeService;
    @Autowired
    private UserRepo userRepo;

    public String sendOtplogin(String phoneNumber) {
        try {

            User user = userRepo.findUserByContactNo(phoneNumber);
            if (user == null) {
                throw new Exception("User not found");
            }

            String otp = otpGenerateService.generateOTP();

            //Save or update user login details
            UserLogin userLogin = userLoginRepo.findById(phoneNumber).orElse(new UserLogin());
            userLogin.setPhoneNumber(phoneNumber);
            userLogin.setOtp(otp);
            userLogin.setVerified(false);
            userLoginRepo.save(userLogin);

            String longOtpMessage = "Dear User, \n\n"
                    + "Thank you for using our service. We are sending you the OTP for authentication. Please use the following code to complete your verification process. "
                    + "Your OTP code is: " + otp + ". \n\n"
                    + "This OTP is valid for 5 minutes. If you did not request this, please ignore this message. "
                    + "For more information, visit our website or contact support.";

            //Send OTP via SMS
            //twilioSmsService.sendMessage(phoneNumber, longOtpMessage);

            return "OTP sent successfully ";

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP : " + e.getMessage());
        }
    }

    public String sendOtpSignUp(String phoneNumber) {
        try {

            User user = userRepo.findUserByContactNo(phoneNumber);

            if (user != null) {
                throw new Exception("This number already used");
            }

            String otp = otpGenerateService.generateOTP();

            //Save or update user login details
            UserLogin userLogin = userLoginRepo.findById(phoneNumber).orElse(new UserLogin());
            userLogin.setPhoneNumber(phoneNumber);
            userLogin.setOtp(otp);
            userLogin.setVerified(false);
            userLoginRepo.save(userLogin);

            String longOtpMessage = "Dear User, \n\n"
                    + "Thank you for using our service. We are sending you the OTP for authentication. Please use the following code to complete your verification process. "
                    + "Your OTP code is: " + otp + ". \n\n"
                    + "This OTP is valid for 5 minutes. If you did not request this, please ignore this message. "
                    + "For more information, visit our website or contact support.";

            //Send OTP via SMS
            //twilioSmsService.sendMessage(phoneNumber, longOtpMessage);

            return "OTP sent successfully ";

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP : " + e.getMessage());
        }
    }

    public Object validateOtp(LoginRequestDto loginRequest) {
        try {
            UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(loginRequest.getPhoneNumber());

            if (userLogin == null) {
                throw new Exception("Number not found");
            }

            if (userLogin.getOtp().equals(loginRequest.getOtp())) {
                userLogin.setVerified(true);
                userLoginRepo.save(userLogin);
                User user = userRepo.getUserByContactNo(loginRequest.getPhoneNumber());
                return user;
            } else {
                return "Invalid OTP";
            }
        } catch (Exception e) {
            return "OTP verification failed: " + e.getMessage();
        }
    }

    public void sendCall(String phoneNumber) {
        try {
            twilioSmsService.sendCall(phoneNumber, otpGenerateService.generateOTP());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private List<VehicleMockDataDTO> loadMockData() {
        ObjectMapper objectMapper = new ObjectMapper();

        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("mock_vehicles.json")) {
            if (inputStream == null) {
                throw new RuntimeException("Mock vehicle data file not found!");
            }

            // Read JSON into List of VehicleMockDataDTO
            List<VehicleMockDataDTO> mockDataList = objectMapper.readValue(
                    inputStream, new TypeReference<List<VehicleMockDataDTO>>() {
                    }
            );

            // Convert to DTO using ModelMapper (Optional)
            return mockDataList.stream()
                    .map(vehicle -> modelMapper.map(vehicle, VehicleMockDataDTO.class))
                    .collect(Collectors.toList());

        } catch (IOException e) {
            throw new RuntimeException("Error reading mock vehicle data", e);
        }
    }

    public VehicalDTO registerVehicalDetails(VehicalDTO vehicalDTO) {
        // Load mock data
        List<VehicleMockDataDTO> mockVehicles = loadMockData();

        // Check if the new vehicle exists in mock data
        boolean isDuplicate = mockVehicles.stream().anyMatch(mockVehicle ->
                mockVehicle.getChassiNo().equals(vehicalDTO.getChassiNo()) &&
                        mockVehicle.getVehicalNo().equals(vehicalDTO.getVehicalNo()) &&
                        mockVehicle.getEnginNo().equals(vehicalDTO.getEnginNo()) &&
                        mockVehicle.getVehicalType().equals(vehicalDTO.getVehicalType())
        );

        if (!isDuplicate) {
            throw new RuntimeException("Vehicle do not exists!");
        }

        // If not found in mock data, proceed with registration
        VehicalDTO vehicalDTO1 = vehicalService.addVehical(vehicalDTO);

        // Create CustomerFuelQuotaDTO
        CustomerFuelQuotaDTO customerFuelQuotadto = new CustomerFuelQuotaDTO();
        customerFuelQuotadto.setEligibleDays(VehicalEligibleData.getEligibleDays(vehicalDTO1.getVehicalType()));
        customerFuelQuotadto.setEligibleFuelQuota(VehicalEligibleData.getEligibleFuelQuota(vehicalDTO1.getVehicalType()));
        customerFuelQuotadto.setRemainFuel(VehicalEligibleData.getEligibleFuelQuota(vehicalDTO1.getVehicalType()));
        customerFuelQuotadto.setUsedFuelQuota(0);
        customerFuelQuotadto.setUser(vehicalDTO.getUser());
        customerFuelQuotadto.setVehical(modelMapper.map(vehicalDTO1, Vehical.class));

        // Save Customer Fuel Quota
        CustomerFuelQuotaDTO customerFuelQuotadto1 = customerFualQuataService.saveCustomerFuelQuota(customerFuelQuotadto);

        // Generate QR Code
        QrcodeDTO qrcodeDTO = new QrcodeDTO();
        qrcodeDTO.setContent(Integer.toString(customerFuelQuotadto1.getCustomerFuelQuotaId()));
        qrcodeDTO.setCustomerFualQuata(modelMapper.map(customerFuelQuotadto1, CustomerFuelQuota.class));

        qrcodeService.addQrcode(qrcodeDTO);

        return vehicalDTO1;
    }


}