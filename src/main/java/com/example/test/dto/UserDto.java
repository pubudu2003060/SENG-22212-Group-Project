package com.example.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

    private int userId;
    private String firstName;
    private String lastName;
    private String contactNo;
    private String address;
    private String identityType;
    private String idNo;

}
