package com.example.test.controller;

import com.example.test.dto.LoginRequestDto;
import com.example.test.dto.VehicalDTO;
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

    @PostMapping("/send-otp/{phoneNumber}")
    public String sendOtp(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            return userLoginService.sendOtplogin(phoneNumber);
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/send-otp/su/{phoneNumber}")
    public String sendOtpSignUP(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            return userLoginService.sendOtpSignUp(phoneNumber);
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/validate-otp")
    public Object validateOtp(@RequestBody LoginRequestDto loginRequest) {
        try {
            return userLoginService.validateOtp(loginRequest);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/makecall/{phoneNumber}")
    public Void sendcall(@PathVariable("phoneNumber") String phoneNumber) {
        userLoginService.sendCall(phoneNumber);
        return null;
    }

    @GetMapping(value = "/twiml")
    public String getTwiML(@RequestParam String otp) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<Response>\n" +
                "    <Say voice=\"alice\">Hello, this is your Spring Boot application calling you! Your API is " + otp + "</Say>\n" +
                "</Response>";
    }

    @PostMapping("/addvehical")
    public VehicalDTO addVehical(@RequestBody VehicalDTO vehicalDTO) {
        return userLoginService.registerVehicalDetails(vehicalDTO);
    }
}
