package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
}
