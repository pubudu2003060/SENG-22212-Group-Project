package com.example.test.repo;

import com.example.test.model.Qrcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QrcodeRepo extends JpaRepository<Qrcode, Integer> {

    Qrcode getQrcodeByCustomerFualQuata_Vehical_VehicalNo(String customerFualQuataVehicalVehicalNo);

}
