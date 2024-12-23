package com.gasstation.backendPart1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")  // Changed from "user" to avoid reserved keyword
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private int id;

    @Column(name = "first_name")  // Using conventional naming
    private String fName;  // Changed from F_name to follow Java naming conventions

    @Column(name = "last_name")
    private String lName;  // Changed from L_name

    @Column(name = "contact_no")
    private String contactNo;

    private String address;

    @Column(name = "identity_type")
    private String identityType;

    @Column(name = "id_no")
    private String idNo;
}