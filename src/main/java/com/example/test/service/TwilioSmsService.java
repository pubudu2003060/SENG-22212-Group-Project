package com.example.test.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Transactional
public class TwilioSmsService {
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

    public void sendMessage(String phoneNumber, String message) {
        initTwilio();

        Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(fromPhoneNumber),
                message
        ).create();
        System.out.println("OTP sent to " + phoneNumber);
    }

    public void sendCall(String phoneNumber,String otp) throws URISyntaxException {
        initTwilio();

        String twimlUrl = "https://c7e9-192-248-24-51.ngrok-free.app/api/v1/login/twiml?otp" + otp;

        Call.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(fromPhoneNumber),
                new URI(twimlUrl)
        ).create();


    }
}