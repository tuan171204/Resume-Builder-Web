package com.example.resume_service.dtos.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EducationDto {
    String id;
    String schoolName;
    String degree;
    String fieldOfStudy;
    LocalDate startDate;
    LocalDate endDate;
    String description;
}
