package com.example.test.repo;

import com.example.test.model.Qrcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QrcodeRepo extends JpaRepository<Qrcode, Integer> {
}
