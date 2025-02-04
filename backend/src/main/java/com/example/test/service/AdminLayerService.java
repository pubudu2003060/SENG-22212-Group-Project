package com.example.test.service;

import com.example.test.dto.AdminDTO;
import com.example.test.dto.AdminSignInDTO;
import com.example.test.dto.BuyquotaFuelStationDTO;
import com.example.test.enump.FuelType;
import com.example.test.model.BuyQuota;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class  AdminLayerService {

    @Autowired
    private BuyQuotaService buyQuotaService;
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;

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

    public int adminSignIn(AdminSignInDTO adminSignInDTO){
        AdminDTO adminDTO = adminService.getAdminByUserNameAndPassword(adminSignInDTO);

        if(adminDTO == null){
            return 0;
        }else{
            return 1;
        }
    }


    public List<BuyquotaFuelStationDTO> getFuelStationBuyQuoto() {
        return buyQuotaService.getFuelStationBuyQuoto();
    }

}
