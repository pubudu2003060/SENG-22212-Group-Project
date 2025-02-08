package com.example.test.Security.config;

import com.example.test.Security.Filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final JwtFilter jwtFilter;

    private final AuthenticationProvider adminAuthProvider;

    private final AuthenticationProvider userAuthProvider;

    private final AuthenticationProvider fuelStationAuthProvider;

    public SecurityConfig(JwtFilter jwtFilter,
                          AuthenticationProvider adminAuthProvider,
                          AuthenticationProvider userAuthProvider,
                          AuthenticationProvider fuelStationAuthProvider) {
        this.jwtFilter = jwtFilter;
        this.adminAuthProvider = adminAuthProvider;
        this.userAuthProvider = userAuthProvider;
        this.fuelStationAuthProvider = fuelStationAuthProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configure(http))  // Enable CORS
                .csrf(csrf -> csrf.disable())  // Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/adminsignin", "/api/v1/addadmin", "/api/v1/login/send-otp/**",
                                "/api/v1/login/validate-otp", "/api/v1/loginfuelstation", "/api/v1/addfuelstationowner",
                                "/api/v1/addfuelstation", "/api/v1/login/addvehical", "/api/v1/getadmin")
                        .permitAll()
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/user/**").hasRole("USER")
                        .requestMatchers("/api/v1/fuelstation/**").hasRole("FUELSTATION")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public AuthenticationManager authenticationManager() {
        return new CustomAuthenticationManager(adminAuthProvider, userAuthProvider, fuelStationAuthProvider);
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
