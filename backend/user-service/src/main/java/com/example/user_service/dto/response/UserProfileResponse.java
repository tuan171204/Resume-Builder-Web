package com.example.user_service.dto.response;

import com.example.user_service.entity.SubscriptionPlan;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
    String id;
    String userId;
    String firstName;
    String lastName;
    String phoneNumber;
    String email;
    LocalDate dob;
    Boolean isActive;
    LocalDate createdAt;
    LocalDate updatedAt;
    SubscriptionPlan subscriptionPlan;
}
