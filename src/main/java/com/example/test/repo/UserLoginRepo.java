package com.example.test.repo;


import com.example.test.model.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserLoginRepo extends JpaRepository<UserLogin, String> {


    @Query("select new com.example.test.model.UserLogin(u.phoneNumber,u.otp,u.verified) from UserLogin u where u.phoneNumber = :phoneNumber")
    UserLogin getUserLoginByPhoneNumber(@Param("phoneNumber") String phoneNumber);


}
