package com.gasstation.backendPart1.repo;

import com.gasstation.backendPart1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
}
