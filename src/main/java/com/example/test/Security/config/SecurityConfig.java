package com.example.test.Security.config;

import com.example.test.Security.Filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/adminsignin", "/api/v1/addadmin", "/api/v1/adduser", "/api/v1/login/send-otp/**",
                                "/api/v1/login/validate-otp", "/api/v1/loginfuelstation", "/api/v1/addfuelstationowner",
                                "/api/v1/addfuelstation", "/api/v1/login/addvehical")
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
