package com.example.test.Security.principals;

// assuming this is the model for the fuel station worker
import com.example.test.model.FuelStation;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class FuelStationPrincipal implements UserDetails {

    private FuelStation fuelStation;

    public FuelStationPrincipal(FuelStation fuelStation) {
        this.fuelStation=fuelStation;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Assuming roles can be added, for now, setting a default "ROLE_WORKER"
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_WORKER"));
    }

    @Override
    public String getPassword() {
        return fuelStation.getPassword(); // Assuming worker object has a password field
    }

    @Override
    public String getUsername() {
        return fuelStation.getUsername(); // Assuming phone number is used as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement expiration logic if necessary
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement locking logic if necessary
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement credentials expiration logic if needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Assuming `isActive` indicates if the worker's account is active
    }

    // Get the FuelStationWorker object if needed

}
