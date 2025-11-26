package com.example.resume_service.dtos.dto;

import com.example.resume_service.models.SelectedExperience;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalysisResult {
    double matchScore;
    String headline;

    // Các ID được AI chọn lọc
    List<String> selectedProjectIds;
    List<String> selectedEducationIds;

    // Skills (AI chọn ra text skill)
    List<String> selectedSkills;
    List<String> suggestedSkills;

    // Experience (AI chọn và viết lại)
    List<SelectedExperience> selectedExperiences;
}