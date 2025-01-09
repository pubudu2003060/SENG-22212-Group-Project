package com.example.test.repo;

import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.model.CustomerFuelQuota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota,Integer> {

    @Query("select new com.example.test.dto.VehicalFualQuataDTO(v.vehicalId,v.vehicalType,v.vehicalNo,c.customerFuelQuotaId,c.eligibleDays,c.eligibleFuelQuota,c.remainFuel) " +
            "FROM CustomerFuelQuota c " +
            "left JOIN Vehical v on v.vehicalId = c.vehical.vehicalId " +
            "where c.user.userId = :customerId  ")
    List<VehicalFualQuataDTO> getVehicalFualQuata(@Param("customerId") int customerId);

}
