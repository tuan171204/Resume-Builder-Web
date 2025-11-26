package com.example.resume_service.services;

import com.example.resume_service.models.Resume;
import com.example.resume_service.dtos.request.GenerateResumeRequest;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ICvService {
    
    // Trả về Resume đầy đủ (Chứa ID, Điểm số, và Text AI viết)
    CompletableFuture<Resume> generateResumeAsync(GenerateResumeRequest request);

    Resume getResume(String resumeId);
    
    List<Resume> getResumesByUser(String userId);
}