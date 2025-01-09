package com.example.test.repo;

import com.example.test.dto.VehicalFualDataDTO;
import com.example.test.model.Vehical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicalRepo extends JpaRepository<Vehical, Integer> {

    @Query("SELECT new com.example.test.dto.VehicalFualDataDTO(v.vehicalId, v.vehicalType, v.vehicalNo, " +
            "cfq.customerFuelQuotaId, cfq.eligibleDays, cfq.eligibleFuelQuota, cfq.remainFuel, " +  // Reordered these fields
            "bq.bqId, bq.amount, bq.date)" +
            "FROM Vehical v " +
            "JOIN User u ON u.userId = v.user.userId " +
            "JOIN CustomerFuelQuota cfq ON cfq.vehical.vehicalId = v.vehicalId " +
            "JOIN BuyQuota bq ON bq.vehical.vehicalId = v.vehicalId " +
            "WHERE u.userId = :customerId")
    List<VehicalFualDataDTO> getvehicalFualData(@Param("customerId") int customerId);

}