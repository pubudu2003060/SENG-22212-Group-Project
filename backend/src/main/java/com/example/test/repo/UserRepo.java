package com.example.test.repo;

import com.example.test.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {

    User getUserByContactNo(String phoneNumber);


}
