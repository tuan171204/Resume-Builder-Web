package com.example.resume_service.dtos.response;

import com.example.resume_service.dtos.dto.EducationDto;
import com.example.resume_service.dtos.dto.ProjectDto;
import com.example.resume_service.models.SelectedExperience;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GenerateResumeResponse {
    
    @JsonProperty("id")
    String id;
    
    @JsonProperty("userId")
    String userId;
    
    @JsonProperty("fullName")
    String fullName;
    
    @JsonProperty("email")
    String email;
    
    @JsonProperty("headline")
    String headline;
    
    @JsonProperty("jobDescription")
    String jobDescription;
    
    @JsonProperty("matchScore")
    Double matchScore;

    @JsonProperty("selectedSkills")
    List<String> selectedSkills;

    @JsonProperty("suggestedSkills")
    List<String> suggestedSkills;

    @JsonProperty("languages")
    List<String> languages; // Thường thì languages giữ nguyên gốc

    @JsonProperty("selectedExperiences")
    List<SelectedExperience> selectedExperiences;

    @JsonProperty("selectedProjects")
    List<ProjectDto> selectedProjects; // Object đầy đủ

    @JsonProperty("selectedEducations")
    List<EducationDto> selectedEducations; // Object đầy đủ
    
    @JsonProperty("createdAt")
    LocalDate createdAt;
    
    @JsonProperty("updatedAt")
    LocalDate updatedAt;
}
