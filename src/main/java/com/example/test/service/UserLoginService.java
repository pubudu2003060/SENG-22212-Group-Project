package com.example.test.service;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.LoginRequestDto;
import com.example.test.dto.QrcodeDTO;
import com.example.test.dto.VehicalDTO;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.model.UserLogin;
import com.example.test.model.Vehical;
import com.example.test.repo.UserLoginRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.net.URISyntaxException;
import java.util.List;

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

    public String sendOtp(String phoneNumber) {
        try {
            String otp = otpGenerateService.generateOTP();

            //Save or update user login details
            UserLogin userLogin = userLoginRepo.findById(phoneNumber).orElse(new UserLogin());
            userLogin.setPhoneNumber(phoneNumber);
            userLogin.setOtp(otp);
            userLogin.setVerified(false);
            userLoginRepo.save(userLogin);

            // Send OTP via SMS
            twilioSmsService.sendOtp(phoneNumber, otp);

            return "OTP sent successfully "+phoneNumber;
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP " + e.getMessage());
        }
    }

    public String validateOtp(LoginRequestDto loginRequest) {
        try {
            UserLogin userLogin = userLoginRepo.getUserLoginByPhoneNumber(loginRequest.getPhoneNumber());

            if (userLogin.getOtp().equals(loginRequest.getOtp())) {
                userLogin.setVerified(true);
                userLoginRepo.save(userLogin);
                return "OTP verified successfully";
            } else {
                return "Invalid OTP";
            }
        } catch (Exception e) {
            return "OTP verification failed: " + e.getMessage();
        }
    }

    public void sendCall(String phoneNumber){
        try {
            twilioSmsService.sendCall(phoneNumber,otpGenerateService.generateOTP());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public VehicalDTO registerVehicalDetails(VehicalDTO vehicalDTO){
        VehicalDTO vehicalDTO1 = vehicalService.addVehical(vehicalDTO);

        CustomerFuelQuotaDTO customerFuelQuotadto = new CustomerFuelQuotaDTO();
        customerFuelQuotadto.setEligibleDays("sunday,monday");
        customerFuelQuotadto.setEligibleFuelQuota(50000);
        customerFuelQuotadto.setRemainFuel(50000);
        customerFuelQuotadto.setUsedFuelQuota(0);
        customerFuelQuotadto.setUser(vehicalDTO.getUser());
        customerFuelQuotadto.setVehical(modelMapper.map(vehicalDTO1, Vehical.class));

        CustomerFuelQuotaDTO customerFuelQuotadto1 = customerFualQuataService.saveCustomerFuelQuota(customerFuelQuotadto);

        QrcodeDTO qrcodeDTO = new QrcodeDTO();
        qrcodeDTO.setContent("this is a new one");
        qrcodeDTO.setCustomerFualQuata(modelMapper.map(customerFuelQuotadto1,CustomerFuelQuota.class));

        qrcodeService.addQrcode(qrcodeDTO);

        return vehicalDTO1;

    }


}