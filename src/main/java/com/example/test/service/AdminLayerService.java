package com.example.test.service;

import com.example.test.model.BuyQuota;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminLayerService {

    @Autowired
    BuyQuotaService buyQuotaService;

    public Map<String, Map<String, Double>> getBuyQuotasDataByFuelType(String fuelType) {
        // Get all BuyQuota records for the given fuel type
        List<BuyQuota> buyQuotaList = buyQuotaService.getBuyQuotasByFuelType(fuelType);

        // Initialize summary map
        Map<String, Map<String, Double>> summary = new HashMap<>();

        // Define time periods
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(java.time.DayOfWeek.MONDAY);
        LocalDate startOfMonth = today.withDayOfMonth(1);

        // Filter and calculate total amounts
        double totalToday = buyQuotaList.stream()
                .filter(bq -> isSameDay(bq.getDate(), today))
                .mapToDouble(BuyQuota::getAmount)
                .sum();

        double totalThisWeek = buyQuotaList.stream()
                .filter(bq -> isAfterOrSameDay(bq.getDate(), startOfWeek))
                .mapToDouble(BuyQuota::getAmount)
                .sum();

        double totalThisMonth = buyQuotaList.stream()
                .filter(bq -> isAfterOrSameDay(bq.getDate(), startOfMonth))
                .mapToDouble(BuyQuota::getAmount)
                .sum();

        // Populate summary map
        Map<String, Double> fuelSummary = new HashMap<>();
        fuelSummary.put("today", totalToday);
        fuelSummary.put("thisWeek", totalThisWeek);
        fuelSummary.put("thisMonth", totalThisMonth);

        summary.put(fuelType, fuelSummary);

        return summary;
    }

    private boolean isSameDay(Date date, LocalDate targetDate) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return localDate.isEqual(targetDate);
    }

    private boolean isAfterOrSameDay(Date date, LocalDate targetDate) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return !localDate.isBefore(targetDate); // Check if date is on or after targetDate
    }
}
