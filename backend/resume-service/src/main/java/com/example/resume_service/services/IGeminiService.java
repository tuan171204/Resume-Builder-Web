package com.example.resume_service.services;

import com.example.resume_service.dtos.UserProfileDto;
import com.example.resume_service.dtos.AnalysisResult;
import java.util.concurrent.CompletableFuture;

public interface IGeminiService {
    CompletableFuture<AnalysisResult> analyzeAndRewriteAsync(UserProfileDto profile, String jobDescription);
}
