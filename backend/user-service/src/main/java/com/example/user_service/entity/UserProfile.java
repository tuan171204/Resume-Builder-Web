package com.example.user_service.entity;

import jakarta.persistence.PrePersist;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Node("user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    String id;

    @Property("userId")
    String userId;

    String firstName;
    String lastName;
    String phoneNumber;
    String email;
    LocalDate dob;

    Boolean isActive = true;

    @CreatedDate
    LocalDate createdAt;

    @LastModifiedDate
    LocalDate updatedAt;

    SubscriptionPlan subscriptionPlan = SubscriptionPlan.COMMON;

    @PrePersist
    protected void onCreate() {
        if (isActive == null){
            isActive = true;
        }

        if (subscriptionPlan == null){
            subscriptionPlan = SubscriptionPlan.COMMON;
        }
    }
}
