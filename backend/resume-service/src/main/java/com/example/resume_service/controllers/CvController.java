package com.example.resume_service.controllers;

import com.example.resume_service.models.Resume;
import com.example.resume_service.services.ICvService;
import com.example.resume_service.dtos.GenerateResumeRequest;
import com.example.resume_service.dtos.GenerateResumeResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cvs")
@CrossOrigin(origins = "*")
public class CvController {
    
    private static final Logger logger = LoggerFactory.getLogger(CvController.class);
    private final ICvService cvService;

    public CvController(ICvService cvService) {
        this.cvService = cvService;
    }

    /**
     * Generate a new resume by analyzing user profile against job description
     */
    @PostMapping("/generate")
    public CompletableFuture<ResponseEntity<Object>> generateResume(@RequestBody GenerateResumeRequest request) {
        if (request.getUserId() == null || request.getUserId().isEmpty() ||
            request.getJobDescription() == null || request.getJobDescription().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "UserId and JobDescription are required");
            return CompletableFuture.completedFuture(ResponseEntity.badRequest().body((Object)error));
        }

        return cvService.generateResumeAsync(request)
            .thenApply(result -> {
                if (result == null) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Failed to generate resume");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((Object) error);
                }
                // Convert Resume model to GenerateResumeResponse DTO (clean response)
                GenerateResumeResponse response = convertResumeToResponse(result);
                return ResponseEntity.ok((Object) response);
            })
            .exceptionally(ex -> {
                logger.error("Error in GenerateResume: {}", ex.getMessage());
                Map<String, String> error = new HashMap<>();
                error.put("message", "An error occurred while generating resume");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((Object) error);
            });
    }

    /**
     * Get resume by ID
     */
    @GetMapping("/{resumeId}")
    public ResponseEntity<?> getResume(@PathVariable String resumeId) {
        Resume resume = cvService.getResume(resumeId);
        if (resume == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Resume not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        // Convert to response DTO
        GenerateResumeResponse response = convertResumeToResponse(resume);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all resumes for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GenerateResumeResponse>> getUserResumes(@PathVariable String userId) {
        List<Resume> resumes = cvService.getResumesByUser(userId);
        List<GenerateResumeResponse> responses = resumes.stream()
            .map(this::convertResumeToResponse)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    /**
     * Convert Resume model to GenerateResumeResponse DTO (clean response with only selected items)
     */
    private GenerateResumeResponse convertResumeToResponse(Resume resume) {
        return new GenerateResumeResponse(
            resume.getId(),
            resume.getUserId(),
            resume.getFullName(),
            resume.getEmail(),
            resume.getHeadline(),
            resume.getJobDescription(),
            resume.getMatchScore(),
            resume.getSelectedExperiences(),
            resume.getSelectedSkills(),
            resume.getSelectedEducations(),
            resume.getCreatedAt(),
            resume.getUpdatedAt()
        );
    }
}
