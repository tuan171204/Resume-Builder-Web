package com.example.resume_service.dtos.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileDto {

    @JsonProperty("userId")
    String id;

    @JsonProperty("firstName")
    String firstName;

    @JsonProperty("lastName")
    String lastName;

    String email;
    String phoneNumber;

    String headline;

    List<String> skills;

    List<String> languages;

    List<EducationDto> educations;
    List<ExperienceDto> experiences;
    List<ProjectDto> projects;
}
