package com.example.test.repo;

import com.example.test.model.CustomerFuelQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota,Integer> {


}
