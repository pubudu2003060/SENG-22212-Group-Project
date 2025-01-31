package com.example.test.Security.Services;

import com.example.test.model.FuelStation;
import com.example.test.repo.FuelStationRepo;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuelStationDetailsService implements UserDetailsService {
    private final FuelStationRepo fuelStationRepo;


    public FuelStationDetailsService(FuelStationRepo fuelStationRepo) {
        this.fuelStationRepo = fuelStationRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        FuelStation fuelStation = fuelStationRepo.findById(Integer.parseInt(id)).orElseThrow(() -> new IllegalArgumentException("Station not found with ID:" + id));
        return new org.springframework.security.core.userdetails.User(
                fuelStation.getUsername(),
                fuelStation.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_FUELSTATION"))
        );
    }
}
