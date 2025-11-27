package com.example.identity_service.dto.response;

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
    String firstName;
    String lastName;
    String phoneNumber;
    String email;
    LocalDate dob;
    Boolean isActive;
    LocalDate createdAt;
    LocalDate updatedAt;
    String accountType;
}
