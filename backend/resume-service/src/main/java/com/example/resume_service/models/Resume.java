package com.example.resume_service.models;

import com.example.resume_service.dtos.dto.EducationDto;
import com.example.resume_service.dtos.dto.ProjectDto;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "Resumes")
public class Resume {
    @Id
    String id;
    
    @Field("userId")
    String userId;
    
    @Field("fullName")
    String fullName;
    
    @Field("email")
    String email;

    @Field("jobDescription")
    String jobDescription;

    @Field("headline")
    String headline;
    
    @Field("matchScore")
    Double matchScore;

    @Field("selectedSkills")
    List<String> selectedSkills;
    List<String> suggestedSkills;
    
    @Field("selectedExperiences")
    List<SelectedExperience> selectedExperiences;

    @Field("selectedEducations")
    List<EducationDto> selectedEducations;

    List<ProjectDto> selectedProjects;

    @Field("languages")
    List<String> languages;
    
    @Field("createdAt")
    LocalDate createdAt = LocalDate.now();
    
    @Field("updatedAt")
    LocalDate updatedAt = LocalDate.now();

}
