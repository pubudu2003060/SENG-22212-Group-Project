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

    public void sendOtp(String phoneNumber, String otp) {
        initTwilio();

        String longOtpMessage = "Dear User, \n\n"
                + "Thank you for using our service. We are sending you the OTP for authentication. Please use the following code to complete your verification process. "
                + "Your OTP code is: " + otp + ". \n\n"
                + "This OTP is valid for 5 minutes. If you did not request this, please ignore this message. "
                + "For more information, visit our website or contact support.";

        Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(fromPhoneNumber),
                longOtpMessage
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