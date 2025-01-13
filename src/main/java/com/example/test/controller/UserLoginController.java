package com.example.test.controller;

import com.example.test.dto.LoginRequestDto;
import com.example.test.model.UserLogin;
import com.example.test.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/login")
public class UserLoginController {
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String phoneNumber) {
        return userLoginService.sendOtp(phoneNumber);
    }

    @PostMapping("/validate-otp")
    public String validateOtp(@RequestBody LoginRequestDto loginRequest) {
        return userLoginService.validateOtp(loginRequest);
    }
}
