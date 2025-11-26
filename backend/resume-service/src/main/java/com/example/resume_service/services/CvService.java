package com.example.resume_service.services;

import com.example.resume_service.clients.IUserClient;
import com.example.resume_service.clients.UserFeignClient;
import com.example.resume_service.dtos.dto.*;
import com.example.resume_service.dtos.request.*;
import com.example.resume_service.dtos.response.GenerateResumeResponse;
import com.example.resume_service.models.Resume;
import com.example.resume_service.models.SelectedExperience;
import com.example.resume_service.repositories.ResumeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CvService {
    ResumeRepository resumeRepository;
    UserFeignClient userFeignClient;
    GeminiService geminiService;

    public GenerateResumeResponse generateResume(GenerateResumeRequest request) {
        String userId = request.getUserId();

        // Sử dụng thenCompose để chain các Async tasks
        UserProfileDto userProfile =  userFeignClient.getUserProfileAsync(userId);

        if (userProfile == null) {
            throw new RuntimeException("User profile not found");
        }

        AnalysisResult analysisResult = geminiService.analyzeAndRewriteAsync(userProfile, request.getJobDescription());

        Resume resume = mapToResumeEntity(userProfile, request.getJobDescription(), analysisResult);
        Resume savedResume = resumeRepository.save(resume);

        return buildFullResponse(savedResume, userProfile, analysisResult);

    }

    private Resume mapToResumeEntity(UserProfileDto profile, String jd, AnalysisResult aiResult) {
        return Resume.builder()
                .userId(profile.getId())
                .fullName(profile.getFirstName() + " " + profile.getLastName())
                .email(profile.getEmail())
                .jobDescription(jd)
                .headline(aiResult.getHeadline())
                .matchScore(aiResult.getMatchScore())
                .selectedSkills(aiResult.getSelectedSkills())
                .suggestedSkills(aiResult.getSuggestedSkills())
                .selectedExperiences(aiResult.getSelectedExperiences())
                // Assuming Resume entity stores just IDs or minimal info for projects/edu
                // or you can serialize the full list to JSON if using MongoDB
                .createdAt(LocalDate.now())
                .updatedAt(LocalDate.now())
                .build();
    }

    private GenerateResumeResponse buildFullResponse(Resume resume, UserProfileDto profile, AnalysisResult aiResult) {
        // Filter Projects based on AI selection
        List<ProjectDto> filteredProjects = new ArrayList<>();
        if (profile.getProjects() != null) {
            if (aiResult.getSelectedProjectIds() != null && !aiResult.getSelectedProjectIds().isEmpty()) {
                filteredProjects = profile.getProjects().stream()
                        .filter(p -> aiResult.getSelectedProjectIds().contains(p.getId()))
                        .collect(Collectors.toList());
            } else {
                // Fallback: If AI selected nothing (maybe empty list), take all or top 3?
                // Let's take all for safety if AI returns empty but user has projects.
                filteredProjects = profile.getProjects();
            }
        }

        // Filter Educations based on AI selection
        List<EducationDto> filteredEducations = new ArrayList<>();
        if (profile.getEducations() != null) {
            if (aiResult.getSelectedEducationIds() != null && !aiResult.getSelectedEducationIds().isEmpty()) {
                filteredEducations = profile.getEducations().stream()
                        .filter(e -> aiResult.getSelectedEducationIds().contains(e.getId()))
                        .collect(Collectors.toList());
            } else {
                filteredEducations = profile.getEducations();
            }
        }

        return GenerateResumeResponse.builder()
                .id(resume.getId())
                .userId(resume.getUserId())
                .fullName(resume.getFullName())
                .email(resume.getEmail())
                .headline(resume.getHeadline())
                .jobDescription(resume.getJobDescription())
                .matchScore(resume.getMatchScore())
                .selectedSkills(resume.getSelectedSkills())
                .suggestedSkills(resume.getSuggestedSkills())
                .selectedExperiences(resume.getSelectedExperiences()) // AI rewritten text + ID
                .selectedProjects(filteredProjects) // Full Original Objects
                .selectedEducations(filteredEducations) // Full Original Objects
                .languages(profile.getLanguages())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }

    public Resume getResume(String resumeId) {
        return resumeRepository.findById(resumeId).orElse(null);
    }

    public List<Resume> getResumesByUser(String userId) {
        return resumeRepository.findByUserId(userId);
    }

}