package com.example.test.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TwilioSmsService implements SmsService {
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
        initTwilio();
        Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(fromPhoneNumber),
                "Your OTP is:" + otp
        ).create();
    }
}