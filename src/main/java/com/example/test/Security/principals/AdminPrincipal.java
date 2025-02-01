package com.example.test.Security.principals;

import com.example.test.model.Admin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class AdminPrincipal implements UserDetails {

    private final Admin admin;

    public AdminPrincipal(Admin admin) {
        this.admin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Ensure roles are handled dynamically, and you can add more roles in the future
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public String getPassword() {
        return admin.getPassword();
    }

    @Override
    public String getUsername() {
        return admin.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        // Consider adding actual expiration handling if applicable to your system
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Check if admin account is locked, could use additional status flags for more control
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Add logic to handle credential expiration if necessary
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Add logic to enable/disable admin user based on status in the DB
        return true;
    }
}
