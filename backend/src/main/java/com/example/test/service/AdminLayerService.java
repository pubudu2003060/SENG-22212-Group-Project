package com.example.test.service;

import com.example.test.Security.Services.JWTService;
import com.example.test.Security.principals.UserPrincipal;
import com.example.test.dto.AdminDTO;
import com.example.test.dto.AdminSignInDTO;
import com.example.test.dto.BuyquotaFuelStationDTO;
import com.example.test.enump.FuelType;
import com.example.test.model.BuyQuota;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
@Transactional
public class  AdminLayerService {

    @Autowired
    private BuyQuotaService buyQuotaService;
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;


    public Map<String, Double> getBuyQuotasDataByFuelType(FuelType fuelType) {

        List<BuyQuota> buyQuotaList = buyQuotaService.getBuyQuotasByFuelType(fuelType);
        // Initialize summary map
        Map<String, Double> summary = new HashMap<>();

        if(buyQuotaList.isEmpty()) {
            return summary;
        }

        // Define dates for today, start of the week, and start of the month
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate startOfMonth = today.withDayOfMonth(1);

        // Aggregate totals
        double totalToday = 0;
        double totalThisWeek = 0;
        double totalThisMonth = 0;

        for (BuyQuota bq : buyQuotaList) {
            LocalDate quotaDate = bq.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (quotaDate.isEqual(today)) {
                totalToday += bq.getAmount();
            }
            if (!quotaDate.isBefore(startOfWeek)) {
                totalThisWeek += bq.getAmount();
            }
            if (!quotaDate.isBefore(startOfMonth)) {
                totalThisMonth += bq.getAmount();
            }
        }

        // Populate the summary map
        summary.put("today", totalToday);
        summary.put("thisWeek", totalThisWeek);
        summary.put("thisMonth", totalThisMonth);

        return summary;
    }

    public int tranctionscountByFuelTypeandDate(String fuelType,Date date) {
        return buyQuotaService.countByFuelTypeByDate(fuelType,date);
    }

    public ResponseEntity<String> adminSignIn(AdminSignInDTO adminSignInDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            adminSignInDTO.getEmail(),
                            adminSignInDTO.getPassword(),
                            Collections.singletonList(new SimpleGrantedAuthority("ADMIN"))
                    )
            );

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateAdminToken(adminSignInDTO.getEmail());
                return ResponseEntity.ok(token); // Return 200 OK with the token
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authentication failed: " + e.getMessage());
        }
    }



    public List<BuyquotaFuelStationDTO> getFuelStationBuyQuoto() {
        return buyQuotaService.getFuelStationBuyQuoto();
    }

}
