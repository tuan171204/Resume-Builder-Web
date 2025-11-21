package com.example.identity_service.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private LocalDate dob;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDate.now();
        }

        if (updatedAt == null){
            updatedAt = LocalDate.now();
        }

        if (isActive == null){
            isActive = true;
        }
    }
}
