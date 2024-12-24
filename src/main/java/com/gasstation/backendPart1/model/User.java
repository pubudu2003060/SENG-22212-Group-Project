package com.gasstation.backendPart1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private int id;
    private String F_name;
    private String L_name;
    private String contactNo;
    private String address;
    private String identityType;
    private String idNo;
    //ane manda itim
}
