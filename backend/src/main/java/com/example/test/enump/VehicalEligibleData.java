package com.example.test.enump;

import java.util.*;

public class VehicalEligibleData {

    private static final Map<VehicalType, String> ELIGIBLE_DAYS_MAP = new EnumMap<>(VehicalType.class);
    private static final Map<VehicalType, Integer> ELIGIBLE_FUEL_QUOTA_MAP = new EnumMap<>(VehicalType.class);

    static {
        // Mapping for eligible days
        ELIGIBLE_DAYS_MAP.put(VehicalType.CAR, "sunday,monday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.LORRY, "tuesday,wednesday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.VAN, "thursday,friday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.THREEWHEEL, "saturday,sunday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.BUS, "monday,tuesday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.BIKE, "wednesday,thursday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.TRACTOR, "friday,saturday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.OTHER, "sunday");
        ELIGIBLE_DAYS_MAP.put(VehicalType.TRUCK, "monday,wednesday,friday");

        // Mapping for eligible fuel quota (in liters)
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.CAR, 20);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.LORRY, 50);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.VAN, 30);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.THREEWHEEL, 10);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.BUS, 50);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.BIKE, 10);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.TRACTOR, 40);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.OTHER, 15);
        ELIGIBLE_FUEL_QUOTA_MAP.put(VehicalType.TRUCK, 60);
    }

    // Method to get eligible days based on vehicle type
    public static String getEligibleDays(VehicalType vehicalType) {
        return ELIGIBLE_DAYS_MAP.getOrDefault(vehicalType, "No eligible days");
    }

    // Method to get eligible fuel quota based on vehicle type
    public static int getEligibleFuelQuota(VehicalType vehicalType) {
        return ELIGIBLE_FUEL_QUOTA_MAP.getOrDefault(vehicalType, 0);
    }
}