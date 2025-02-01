package com.example.test.Security.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthProviderConfig {
    private final UserDetailsService adminDetailsService;
    private final UserDetailsService userDetailsService;
    private final UserDetailsService fuelStationDetailsService;

    @Lazy // Add this annotation
    private final PasswordEncoder passwordEncoder;

    public AuthProviderConfig(
            @Qualifier("adminDetailsService") UserDetailsService adminDetailsService,
            @Qualifier("userDetailsServiceImp") UserDetailsService userDetailsService,
            @Qualifier("fuelStationDetailsService") UserDetailsService fuelStationDetailsService,
            @Lazy PasswordEncoder passwordEncoder) { // Annotate here
        this.adminDetailsService = adminDetailsService;
        this.userDetailsService = userDetailsService;
        this.fuelStationDetailsService = fuelStationDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public AuthenticationProvider adminAuthProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(adminDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationProvider userAuthProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationProvider fuelStationAuthProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(fuelStationDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }
}
