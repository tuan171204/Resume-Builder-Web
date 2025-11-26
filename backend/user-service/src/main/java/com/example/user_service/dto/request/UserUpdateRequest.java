package com.example.user_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String password;
    String firstName;
    String lastName;
    String phoneNumber;
    LocalDate dob;

    // Dữ liệu phức tạp
    List<String> skills;
    List<String> languages;
    List<ExperienceRequest> experiences;
    List<EducationRequest> educations;
    List<ProjectRequest> projects;
    
    // Inner DTOs
    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ExperienceRequest {
        String companyName;
        String position;
        LocalDate startDate;
        LocalDate endDate;
        String description;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class EducationRequest {
        String schoolName;
        String degree;
        String fieldOfStudy;
        LocalDate startDate;
        LocalDate endDate;
        String description;
    }
    
    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ProjectRequest {
        String name;
        String description;
        LocalDate startDate;
        LocalDate endDate;
        List<String> technologies;
    }
}