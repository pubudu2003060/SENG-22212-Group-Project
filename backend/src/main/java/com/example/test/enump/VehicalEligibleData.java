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
