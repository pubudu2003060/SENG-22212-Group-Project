package com.gasstation.backendPart1.dataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerNotificationDTO {
    private int customerNotificationId;
    private String content;
}
