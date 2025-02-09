package com.example.test.controller;

import com.example.test.Security.Services.JWTService;
import com.example.test.dto.LoginRequestDto;
import com.example.test.dto.VehicalDTO;
import com.example.test.Security.Services.JWTService;
import com.example.test.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/login")
public class UserLoginController {
    @Autowired
    private UserLoginService userLoginService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/send-otp/{phoneNumber}")
    public String sendOtp(@PathVariable("phoneNumber") String phoneNumber) {
        try {
            return userLoginService.sendOtp(phoneNumber);
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @PostMapping("/validate-otp")
    public ResponseEntity<Map<String, Object>> validateOtp(@RequestBody LoginRequestDto loginRequest) {
        try {
            // Validate OTP and get user details
            Object responseBody = userLoginService.validateOtp(loginRequest);

            // Generate JWT token
            String jwtToken = jwtService.generateUserToken(loginRequest.getPhoneNumber());


            Map<String, Object> response = new HashMap<>();
            response.put("token", jwtToken);
            response.put("data", responseBody);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
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

    @PostMapping("/user/addvehical")
    public VehicalDTO addVehical(@RequestBody VehicalDTO vehicalDTO) {
        return userLoginService.registerVehicalDetails(vehicalDTO);
    }
}
