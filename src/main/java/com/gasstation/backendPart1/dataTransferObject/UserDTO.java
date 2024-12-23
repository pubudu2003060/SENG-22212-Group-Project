package com.gasstation.backendPart1.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private String F_name;
    private String L_name;
    private String contactNo;
    private String address;
    private String identityType;
    private String idNo;
}
