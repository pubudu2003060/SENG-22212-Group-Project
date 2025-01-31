package com.example.test.Security.Services;

import com.example.test.model.FuelStation;
import com.example.test.repo.FuelStationRepo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

@Qualifier("fuelStationDetailsService")
public class FuelStationDetailsService implements UserDetailsService {
    private final FuelStationRepo fuelStationRepo;


    public FuelStationDetailsService(FuelStationRepo fuelStationRepo) {
        this.fuelStationRepo = fuelStationRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        FuelStation fuelStation = fuelStationRepo.findByUsernameAndRole(username, "FUELSTATION");
        return new org.springframework.security.core.userdetails.User(
                fuelStation.getUsername(),
                fuelStation.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_FUELSTATION"))
        );
    }
}
