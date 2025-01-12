package com.example.test.service;

import com.example.test.dto.LoginRequestDto;
import com.example.test.model.UserLogin;
import com.example.test.repo.UserLoginRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginService {

    private UserLoginRepo userLoginRepo;
    private OtpGenerateService otpGenerateService;
    private SmsService smsService;

    public String sendOtp(String phoneNumber) {
        String otp = otpGenerateService.generateOTP();
        UserLogin user = userLoginRepo.findById(phoneNumber)
                .orElse(new UserLogin(phoneNumber, null, false));
        user.setOtp(otp);
        user.setVerified(false);
        userLoginRepo.save(user);

        smsService.sendOtp(phoneNumber, otp);
        return "OTP sent successfully!";
    }
    public String validateOtp(LoginRequestDto loginRequest){
        Optional<UserLogin> userOpt= userLoginRepo.findById(loginRequest.getPhoneNumber());
        if(userOpt.isPresent()){

            UserLogin user = userOpt.get();

            if(user.getOtp().equals(loginRequest.getOtp())){
                user.setVerified(true);
                userLoginRepo.save(user);
                return "login successfully";
            }
        }
        return "Invalid OTP!";
    }




}
