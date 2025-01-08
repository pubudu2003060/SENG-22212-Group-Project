package com.example.test.service;

import com.example.test.repo.UserLoginRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginService {

    private UserLoginRepo userLoginRepo;
    private OtpGenerateService otpGenerateService;
    private SmsService smsService;

    public String sendotp(String phoneNumber) {
        String otp = otpGenerateService.generateOTP();
        UserLogin user = userLoginRepo.findById(phoneNumber)
                .orElse(new UserLogin(phoneNumber, null, false));
        user.setOtp(otp);
        user.setVerified(false);
        userLoginRepo.save(user);

        // Send OTP SMS
        smsService.sendOtp(phoneNumber, otp);
        return "OTP sent successfully!";
    }



    /*private String generateOTP(){
        SecureRandom random = new SecureRandom();//Secure random is a class in security dependency which helps to generate secure OTP
        int otp=10000+random.nextInt(90000);//this gives the otps between 10000 and 99999
        return String.valueOf(otp);
    }*/
}
