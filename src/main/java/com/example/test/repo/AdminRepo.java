package com.example.test.repo;

import com.example.test.dto.AdminDTO;
import com.example.test.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepo extends JpaRepository<Admin,Integer> {

    Admin getAdminByEmailAndPassword(String email, String password);

}
