package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.CustomerFuelQuota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota, Integer> {
}
