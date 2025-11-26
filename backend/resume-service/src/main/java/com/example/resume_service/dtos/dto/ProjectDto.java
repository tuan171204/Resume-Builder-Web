package com.example.resume_service.dtos.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectDto {
    String id;
    String name;
    String description;
    LocalDate startDate;
    LocalDate endDate;
    List<String> technologies;
}