package com.example.test.repo;


import com.example.test.model.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLoginRepo extends JpaRepository<UserLogin, String> {

}
