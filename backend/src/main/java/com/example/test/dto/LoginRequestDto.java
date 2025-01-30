package com.example.test.dto;

import lombok.Data;

@Data
public class LoginRequestDto {

    private String phoneNumber;
    private String otp;

}
