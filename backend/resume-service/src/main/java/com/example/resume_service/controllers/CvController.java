package com.example.resume_service.controllers;

import com.example.resume_service.mapper.CvMapper;
import com.example.resume_service.models.Resume;
import com.example.resume_service.services.CvService;
import com.example.resume_service.services.ICvService;
import com.example.resume_service.dtos.request.GenerateResumeRequest;
import com.example.resume_service.dtos.response.GenerateResumeResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CvController {

    CvService cvService;
    CvMapper cvMapper;

    /**
     * Generate a new resume by analyzing user profile against job description
     */
    @PostMapping("/generate")
    public ResponseEntity<GenerateResumeResponse> generateResume(@RequestBody GenerateResumeRequest request) {
        log.info("Generate request: {}", request.toString());
        if (request.getUserId() == null || request.getUserId().isEmpty() ||
            request.getJobDescription() == null || request.getJobDescription().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "UserId and JobDescription are required");
            return ResponseEntity.badRequest().body((GenerateResumeResponse) error);
        }

        GenerateResumeResponse generateResumeResponse = cvService.generateResume(request);

        // Convert Resume model to GenerateResumeResponse DTO (clean response)
        return ResponseEntity.ok(generateResumeResponse);
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
        return cvMapper.convertResumeToResponse(resume);
    }


}
