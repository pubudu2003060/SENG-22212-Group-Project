package com.example.test.repo;


import com.example.test.model.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserLoginRepo extends JpaRepository<UserLogin, String> {

    UserLogin getUserLoginByPhoneNumber(String phoneNumber);

    String phoneNumber(String phoneNumber);
}
