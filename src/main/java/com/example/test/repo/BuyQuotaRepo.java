package com.example.test.repo;

import com.example.test.dto.BuyQuatoVehicleDTO;
import com.example.test.enump.FuelType;
import com.example.test.model.BuyQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BuyQuotaRepo extends JpaRepository<BuyQuota, Integer> {

    @Query("select new com.example.test.dto.BuyQuatoVehicleDTO(b.bqId,b.amount,b.date,v.vehicalId,v.vehicalType,v.vehicalNo,v.fualType)" +
            "from BuyQuota b " +
            "join Vehical v on v.vehicalId = b.vehical.vehicalId " +
            "where b.user.userId = :customerId")
    List<BuyQuatoVehicleDTO> getBuyQuotosByVehical(@Param("customerId")int customerId);

    List<BuyQuota> getBuyQuotasByFuelType(FuelType fuelType);

    @Query("SELECT COUNT(*) " +
            "FROM BuyQuota bq " +
            "WHERE LOWER(bq.fuelType) = LOWER(:fuelType) " +
            "AND DATE(bq.date) = :date")
    int countByFuelTypeAndDate(String fuelType, Date date);
}
