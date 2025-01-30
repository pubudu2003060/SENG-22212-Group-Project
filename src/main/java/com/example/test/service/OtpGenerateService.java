package com.example.test.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@Transactional
public class OtpGenerateService {
     String generateOTP(){
        SecureRandom random = new SecureRandom();//Secure random is a class in security dependency which helps to generate secure OTP
        int otp=1000+random.nextInt(9000);//this gives the otps between 1000 and 9999
        return String.valueOf(otp);
    }
}
