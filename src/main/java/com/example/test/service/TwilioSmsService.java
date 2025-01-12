package com.example.test.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public abstract class TwilioSmsService implements SmsService{
    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authtoken}")
    private String authToken;

    @Value("${twilio.fromPhonenumber}")
    private String fromPhoneNumber;

    @PostConstruct
    private void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    @Override
    public void sendOtp(String phoneNumber, String otp) {
        Message.creator(
                new com.twilio.type.PhoneNumber(phoneNumber),
                new com.twilio.type.PhoneNumber(fromPhoneNumber),
                "Your OTP is: "+otp
        ).create();
    }
}
