package com.example.user_service.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.example.user_service.entity.SubscriptionPlan;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileResponse {
    String id;
    String userId;
    String username;
    String email;
    String firstName;
    String lastName;
    String phoneNumber;
    LocalDate dob;

    SubscriptionPlan subscriptionPlan;

    List<String> skills;
    List<String> languages;
    List<ExperienceResponse> experiences;
    List<EducationResponse> educations;
    List<ProjectResponse> projects;

    // Inner DTOs
    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ExperienceResponse {
        String id;
        String companyName;
        String position;
        LocalDate startDate;
        LocalDate endDate;
        String description;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class EducationResponse {
        String id;
        String schoolName;
        String degree;
        String fieldOfStudy;
        LocalDate startDate;
        LocalDate endDate;
        String description;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ProjectResponse {
        String id;
        String name;
        String description;
        LocalDate startDate;
        LocalDate endDate;
        List<String> technologies;
    }
}