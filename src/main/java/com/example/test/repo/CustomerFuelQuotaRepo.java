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
public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota,Integer> {

    @Query("select new com.example.test.dto.VehicalFualQuataDTO(v.vehicalId,v.vehicalType,v.vehicalNo,c.customerFuelQuotaId,c.eligibleDays,c.eligibleFuelQuota,c.remainFuel) " +
            "FROM CustomerFuelQuota c " +
            "left JOIN Vehical v on v.vehicalId = c.vehical.vehicalId " +
            "where c.user.userId = :customerId  ")
    List<VehicalFualQuataDTO> getVehicalFualQuata(@Param("customerId") int customerId);

    @Query("SELECT new com.example.test.dto.CustomerFuelQuotaDTO(u.firstName, v.vehicalId, v.vehicleType, " +
            "c.eligibleFuelQuota, c.remainFuel, (c.eligibleFuelQuota - c.remainFuel) as usedFuelQuota) " +
            "FROM CustomerFuelQuota c " +
            "JOIN c.Vehical v " +
            "JOIN c.User u " +
            "WHERE (v.vehicleType = :vehicleType OR :vehicleType IS NULL) " +
            "AND (u.firstName = :ownerName OR :ownerName IS NULL) " +
            "AND (c.eligibleFuelQuota = :eligibleFuelQuota OR :eligibleFuelQuota IS NULL)"+
            "AND (u.userId = :customerId)" +
            "AND v.vehicleId=:vehicleId")
    List<CustomerFuelQuotaDTO> getCustomerFuelQuota(@Param("vehicleType") String vehicleType,
                                                    @Param("ownerName") String ownerName,
                                                    @Param("eligibleFuelQuota") Integer eligibleFuelQuota);


    Optional<CustomerFuelQuotaDTO> findByUserId(@Param("customerId") int customerId);
    Optional<CustomerFuelQuotaDTO> findByVehicalId(@Param("vehicleId") int vehicleId);
    List<CustomerFuelQuotaDTO> findByVehicleType(@Param("vehicleType") String vehicleType);





}
