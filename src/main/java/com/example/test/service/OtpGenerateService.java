package com.example.test.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@Transactional
public class OtpGenerateService {
     String generateOTP(){
        SecureRandom random = new SecureRandom();//Secure random is a class in security dependency which helps to generate secure OTP
        int otp=10000+random.nextInt(90000);//this gives the otps between 10000 and 99999
        return String.valueOf(otp);
    }
}
