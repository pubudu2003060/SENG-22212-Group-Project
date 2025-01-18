package com.example.test.repo;

import com.example.test.dto.CustomerFuelQuotaDTO;
import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.model.CustomerFuelQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota, Integer> {

    @Query("select new com.example.test.dto.VehicalFualQuataDTO(v.vehicalId, v.vehicalType, v.vehicalNo, c.customerFuelQuotaId, c.eligibleDays, c.eligibleFuelQuota, c.remainFuel) " +
            "FROM CustomerFuelQuota c " +
            "left JOIN c.vehical v on v.vehicalId = c.vehical.vehicalId " +
            "where c.user.userId = :customerId")
    List<VehicalFualQuataDTO> getVehicalFualQuata(@Param("customerId") int customerId);

    @Query("SELECT new com.example.test.dto.CustomerFuelQuotaDTO(u.firstName, v.vehicalId, v.vehicalType, " +
            "c.eligibleFuelQuota, c.remainFuel,c.usedFuelQuota) " +
            "FROM CustomerFuelQuota c " +
            "JOIN c.vehical v " +
            "JOIN c.user u " +
            "WHERE (v.vehicalType = :vehicleType OR :vehicleType IS NULL) " +
            "AND (c.eligibleFuelQuota = :eligibleFuelQuota OR :eligibleFuelQuota IS NULL) " )
    List<CustomerFuelQuotaDTO> filterFuelQuota(@Param("vehicleType") String vehicleType,
                                                    @Param("eligibleFuelQuota") Integer eligibleFuelQuota);

    @Query("SELECT new com.example.test.dto.CustomerFuelQuotaDTO(u.firstName, v.vehicalId, v.vehicalType, " +
            "c.eligibleFuelQuota, c.remainFuel, (c.eligibleFuelQuota - c.remainFuel) as usedFuelQuota) " +
            "FROM CustomerFuelQuota c " +
            "JOIN c.vehical v " +
            "JOIN c.user u " +
            "WHERE v.vehicalId = :vehicleId")
    Optional<CustomerFuelQuotaDTO> findByVehicalId(@Param("vehicleId") int vehicleId);

    @Query("SELECT c FROM CustomerFuelQuota c JOIN c.vehical v WHERE v.vehicalType = :vehicleType")
    List<CustomerFuelQuota> findByVehicleType(@Param("vehicleType") String vehicleType);

}
