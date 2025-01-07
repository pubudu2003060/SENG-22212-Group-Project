package com.example.test.repo;

import com.example.test.model.BuyQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyQuotaRepo extends JpaRepository<BuyQuota, Integer> {
}
