package com.example.test.Security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthProviderConfig {
    private final UserDetailsService adminDetailsService;
    private final UserDetailsService userDetailsService;
    private final UserDetailsService fuelStationDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AuthProviderConfig(UserDetailsService adminDetailsService,
                              UserDetailsService userDetailsService,
                              UserDetailsService fuelStationDetailsService,
                              PasswordEncoder passwordEncoder) {
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
