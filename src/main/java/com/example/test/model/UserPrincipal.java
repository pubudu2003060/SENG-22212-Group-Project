package com.example.test.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal {
    private UserLogin userLogin; // Assume you have a User entity class

    public UserPrincipal(UserLogin userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You can assign roles here, like "ROLE_USER" or any other roles based on your User class
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }


    @Override
    public String getPhoneNumber() {
        return userLogin.getPhoneNumber(); // Assuming user has phoneNumber as unique identifier
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
