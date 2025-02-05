package com.example.test.Security.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.List;

public class CustomAuthenticationManager implements AuthenticationManager {

    private final AuthenticationProvider adminAuthProvider;
    private final AuthenticationProvider userAuthProvider;
    private final AuthenticationProvider fuelStationAuthProvider;

    public CustomAuthenticationManager(AuthenticationProvider adminAuthProvider,
                                       AuthenticationProvider userAuthProvider,
                                       AuthenticationProvider fuelStationAuthProvider) {
        this.adminAuthProvider = adminAuthProvider;
        this.userAuthProvider = userAuthProvider;
        this.fuelStationAuthProvider = fuelStationAuthProvider;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        String token = (String) authentication.getCredentials();
        System.out.println("Attempting authentication for username: " + username);
        Authentication authResult = null;

        // Try fuel station authentication first

            System.out.println("Attempting fuel station authentication...");
            authResult = fuelStationAuthProvider.authenticate(authentication);
            if (authResult != null) {
                System.out.println("Authenticated as fuel station");
                return authResult;
            } else {
                System.out.println("Fuel station authentication failed");
            }


        // If fuel station authentication fails, try admin authentication
        System.out.println("Attempting admin authentication...");
        authResult = adminAuthProvider.authenticate(authentication);
        if (authResult != null) {
            System.out.println("Authenticated as admin");
            return authResult;
        } else {
            System.out.println("Admin authentication failed");
        }

        // If admin authentication fails, try user authentication
        System.out.println("Attempting user authentication...");
        if(isUserPhoneNumber(username)) {
            System.out.println("Attempting phone number authentication for user...");
            authResult = userAuthProvider.authenticate(authentication);
            if (authResult != null) {
                System.out.println("Authenticated as user");
                return authResult;
            } else {
                System.out.println("User authentication failed");
            }
        }



        // If none of the authentication providers succeed, throw exception
        throw new AuthenticationException("Authentication failed for all providers") {};
    }

    private boolean isFuelStationRegisterdId(String username) {
        // Modify the logic based on how you want to identify fuel station usernames
        return username != null && username.startsWith("station");  // Example condition
    }
    private boolean isUserPhoneNumber(String username) {
        // Modify the logic based on how you identify phone numbers
        // Example: check if the user   nameOrPhone is a valid phone number (could be a regex check)
        return username != null;   // Example phone number format
    }


}
