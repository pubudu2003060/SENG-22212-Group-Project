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
import java.util.logging.Logger;

@Service
@Qualifier("fuelStationDetailsService")
public class FuelStationDetailsService implements UserDetailsService {
    private static final Logger logger= Logger.getLogger(FuelStationDetailsService.class.getName());
    private final FuelStationRepo fuelStationRepo;


    public FuelStationDetailsService(FuelStationRepo fuelStationRepo) {

        this.fuelStationRepo = fuelStationRepo;
        logger.info("FuelStationDetailsService Initialized");
    }

    @Override
    public UserDetails loadUserByUsername(String registerdId) throws UsernameNotFoundException {
        FuelStation fuelStation = fuelStationRepo.findFuelStationByRegisteredId(Integer.parseInt(registerdId));
        if (fuelStation == null) {
            throw new UsernameNotFoundException("FuelStation Not found");
        }
        return new org.springframework.security.core.userdetails.User(
                Integer.toString(fuelStation.getRegisteredId()),
                fuelStation.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_FUELSTATION"))
        );
    }

}
