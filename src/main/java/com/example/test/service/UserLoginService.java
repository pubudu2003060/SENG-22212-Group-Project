package com.example.test.service;

import com.example.test.dto.LoginRequestDto;
import com.example.test.model.UserLogin;
import com.example.test.repo.UserLoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class UserLoginService {

    @Autowired
    private UserLoginRepo userLoginRepo;

    @Autowired
    private OtpGenerateService otpGenerateService;

    @Autowired
    private SmsService smsService;

    public String sendOtp(String phoneNumber) {
        try {
            String otp = otpGenerateService.generateOTP();

            // Save or update user login details
            UserLogin userLogin = userLoginRepo.findById(phoneNumber)
                    .orElse(new UserLogin());
            userLogin.setPhoneNumber(phoneNumber);
            userLogin.setOtp(otp);
            userLogin.setVerified(false);
            userLoginRepo.save(userLogin);

            // Send OTP via SMS
            smsService.sendOtp(phoneNumber, otp);

            return "OTP sent successfully";
        } catch (Exception e) {
            return "Failed to send OTP: " + e.getMessage();
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
}