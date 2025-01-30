package com.example.test.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //this annotation use to mark the class as jpa entity
@Data //this getters and setters for all fields
@AllArgsConstructor //Generates a constructor that accepts all the fields in the class as parameter
@NoArgsConstructor //generate default no arg constructor for the class
public class UserLogin {

    @Id
    private String phoneNumber;

    @Column(nullable = false)
    private  String otp; // to store onetime password

    @Column(nullable = false)
    private boolean verified; // for login verification status(login successfully or not)
}

