package com.example.test.repo;

import com.example.test.dto.QrCodeScanDetailsDTO;
import com.example.test.dto.VehicalFualQuataDTO;
import com.example.test.model.CustomerFuelQuota;
import com.example.test.enump.VehicalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerFuelQuotaRepo extends JpaRepository<CustomerFuelQuota, Integer> {

    @Query("select new com.example.test.dto.VehicalFualQuataDTO(v.vehicalId, v.vehicalType, v.vehicalNo, c.customerFuelQuotaId, c.eligibleDays, c.eligibleFuelQuota, c.remainFuel) " +
            "FROM CustomerFuelQuota c " +
            "left JOIN c.vehical v on v.vehicalId = c.vehical.vehicalId " +
            "where c.user.userId = :customerId")
    List<VehicalFualQuataDTO> getVehicalFualQuata(@Param("customerId") int customerId);

    CustomerFuelQuota getCustomerFuelQuotaByVehical_VehicalId(int vehicalVehicalId);

    @Query("SELECT c FROM CustomerFuelQuota c JOIN c.vehical v WHERE v.vehicalType = :vehicleType")
    List<CustomerFuelQuota> findByVehicleType(@Param("vehicleType") VehicalType vehicleType);

    @Query("SELECT c.eligibleFuelQuota FROM CustomerFuelQuota c JOIN c.vehical v WHERE v.vehicalType = :vehicleType")
    Integer findEligibleFuelCapacityByVehicleType(@Param("vehicleType") VehicalType vehicleType);

    @Query("SELECT new com.example.test.dto.QrCodeScanDetailsDTO( " +
            "u.firstName, u.lastName, u.idNo, " +
            "v.vehicalType, v.vehicalNo, v.fualType, " +
            "c.eligibleDays, c.eligibleFuelQuota, c.remainFuel) " +
            "FROM CustomerFuelQuota c " +
            "JOIN c.user u " +
            "JOIN c.vehical v " +
            "WHERE c.customerFuelQuotaId = :customerFuelQuotaId")
    QrCodeScanDetailsDTO getQrCodeScanDetailsDTO(@Param("customerFuelQuotaId") int customerFuelQuotaId);

    @Modifying
    @Query("update CustomerFuelQuota c set c.remainFuel=:remainFuel where c.customerFuelQuotaId=:customerFuelQuotaId")
    Object updateCustomerFueeldata(@Param("customerFuelQuotaId") int customerFuelQuotaId, @Param("remainFuel") int remainFuel);


    CustomerFuelQuota getCustomerFuelQuotaByCustomerFuelQuotaId(int customerFuelQuotaId);

}
