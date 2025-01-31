package com.example.test.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class FuelStationPrincipal implements UserDetails {

    private FuelStation fuelStation;

    public FuelStationPrincipal(FuelStation fuelStation) {
        this.fuelStation = fuelStation;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_FUELSTATION"));
    }

    @Override
    public String getPassword() {
        return fuelStation.getPassword();
    }

    @Override
    public String getUsername() {
        return fuelStation.getUsername();
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
    public boolean isEnabled() {
        return true;
    }
}
