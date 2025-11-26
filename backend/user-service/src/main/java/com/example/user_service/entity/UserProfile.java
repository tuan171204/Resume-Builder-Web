package com.example.user_service.entity;

import jakarta.persistence.PrePersist;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.neo4j.core.schema.*;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDate;
import java.util.List;

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

    @Relationship(type = "HAS_EXPERIENCE", direction = Relationship.Direction.OUTGOING)
    List<UserExperience> experiences;

    @Relationship(type = "HAS_EDUCATION", direction = Relationship.Direction.OUTGOING)
    List<UserEducation> educations;

    @Relationship(type = "HAS_PROJECT", direction = Relationship.Direction.OUTGOING)
    List<UserProject> projects;

    List<String> skills;

    List<String> languages;

    void beforeSave() {
        if (createdAt == null) createdAt = LocalDate.now();
        updatedAt = LocalDate.now();
    }
}
