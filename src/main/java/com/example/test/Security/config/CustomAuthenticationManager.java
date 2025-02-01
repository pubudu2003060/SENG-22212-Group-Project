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
        // You can add more customized logic here if necessary
        Authentication authResult = adminAuthProvider.authenticate(authentication);
        if (authResult != null) {
            return authResult;
        }

        authResult = userAuthProvider.authenticate(authentication);
        if (authResult != null) {
            return authResult;
        }
        authResult = fuelStationAuthProvider.authenticate(authentication);
        if (authResult != null) {
            return authResult;
        }
        throw new AuthenticationException("Authentication failed for all providers") {};

    }
}
