package com.example.test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    private int userId;
    private String firstName;
    private String lastName;
    private String contactNo;
    private String address;
    private String identityType;
    private String idNo;
}
