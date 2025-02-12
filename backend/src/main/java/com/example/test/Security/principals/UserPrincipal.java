package com.example.test.Security.principals;

import com.example.test.model.UserLogin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class UserPrincipal implements UserDetails {

    private UserLogin userLogin; // Assume you have a User entity class

    public UserPrincipal(UserLogin userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You can assign roles here, like "ROLE_USER" or any other roles based on your User class
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

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
    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

}
