package com.example.resume_service.services;

import com.example.resume_service.clients.UserFeignClient;
import com.example.resume_service.dtos.dto.*;
import com.example.resume_service.models.SelectedExperience;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GeminiService{
    @Value("${openrouter.api-url}")
    String apiUrl;
    
    @Value("${openrouter.api-key}")
    String apiKey;

    @Value("${openrouter.model}")
    String modelName;
    
    final RestTemplate restTemplate;
    final ObjectMapper objectMapper;

    @Qualifier("aiTaskExecutor")
    final Executor aiExecutor;

    @Data
    static class AiMetadataResponse {
        double matchScore;
        String headline;
        List<String> selectedSkills;
        List<String> suggestedSkills;
    }

    // Class nội bộ để hứng kết quả task 2 (Experience)
    @Data
    static class AiExperienceResponse {
        List<SelectedExperience> selectedExperiences;
    }

    public AnalysisResult analyzeAndRewriteAsync(UserProfileDto userProfile, String jobDescription) {
        // Luồng 1: Phân tích số liệu (Nhanh)
        AiMetadataResponse metadataFuture = fetchAiData(buildMetadataPrompt(userProfile, jobDescription), AiMetadataResponse.class);

        // Luồng 2: Viết lại kinh nghiệm (Tốn thời gian nhất)
        AiExperienceResponse experienceFuture = fetchAiData(buildExperiencePrompt(userProfile, jobDescription), AiExperienceResponse.class);


        AiMetadataResponse metadata = metadataFuture;
        AiExperienceResponse exp = experienceFuture;

        return AnalysisResult.builder()
                .matchScore(metadata.getMatchScore())
                .headline(metadata.getHeadline())
                .selectedSkills(metadata.getSelectedSkills())
                .suggestedSkills(metadata.getSuggestedSkills())
                .selectedExperiences(exp.getSelectedExperiences())
                .build();

    }

    private <T> T fetchAiData(String prompt, Class<T> responseType) {
        try {
            long startTime = System.currentTimeMillis();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);
            // Headers bắt buộc của OpenRouter để tránh bị reject/delay
            headers.set("HTTP-Referer", "http://localhost:8080");
            headers.set("X-Title", "Resume Builder");

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", modelName);
            requestBody.put("messages", List.of(Map.of("role", "user", "content", prompt)));
            requestBody.put("temperature", 0.7);
            // Quan trọng: Ép AI trả về JSON mode (nếu model hỗ trợ) để parse nhanh hơn
            requestBody.put("response_format", Map.of("type", "json_object"));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                throw new RuntimeException("AI API failed: " + response.getStatusCode());
            }

            // Parse response
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String content = rootNode.path("choices").get(0).path("message").path("content").asText();
            String cleanJson = cleanJsonString(content);

            log.info("AI Call finished in {}ms for type {}", (System.currentTimeMillis() - startTime), responseType.getSimpleName());

            return objectMapper.readValue(cleanJson, responseType);

        } catch (Exception e) {
            log.error("AI Call Error", e);
            throw new RuntimeException("Error calling AI: " + e.getMessage());
        }
    }

    private String cleanJsonString(String content) {
        content = content.trim();
        if (content.startsWith("```json")) content = content.substring(7);
        else if (content.startsWith("```")) content = content.substring(3);
        if (content.endsWith("```")) content = content.substring(0, content.length() - 3);
        return content.trim();
    }

    private String buildMetadataPrompt(UserProfileDto profile, String jd) {
        StringBuilder sb = new StringBuilder();
        sb.append("\nSYSTEM: You are a strict JSON extractor. Do not use Markdown. Return raw JSON only.\n");
        sb.append("TASK: Analyze the Candidate Profile against the Job Description (JD).\n");
        sb.append("1. Calculate a match score (0-100).\n");
        sb.append("2. Generate a professional headline.\n");
        sb.append("3. Select relevant Skill IDs, Project IDs, and Education IDs from the lists below that match the JD.\n");

        sb.append("\n--- CANDIDATE PROFILE ---\n");

        sb.append("Skills: ").append(profile.getSkills() != null ? String.join(", ", profile.getSkills()) : "").append("\n");
        sb.append("Languages: ").append(profile.getLanguages() != null ? String.join(", ", profile.getLanguages()) : "").append("\n");

        sb.append("Educations:\n");
        if (profile.getEducations() != null) {
            profile.getEducations().forEach(edu ->
                    sb.append(String.format("- ID: %s | School: %s | Degree: %s | Field: %s\n",
                            edu.getId(), edu.getSchoolName(), edu.getDegree(), edu.getFieldOfStudy()))
            );
        }

        sb.append("Projects:\n");
        if (profile.getProjects() != null) {
            profile.getProjects().forEach(proj ->
                    sb.append(String.format("- ID: %s | Name: %s | Tech: %s | Desc: %s\n",
                            proj.getId(), proj.getName(),
                            proj.getTechnologies() != null ? String.join(", ", proj.getTechnologies()) : "",
                            proj.getDescription()))
            );
        }

        sb.append("\n--- JOB DESCRIPTION ---\n").append(jd).append("\n");

        sb.append("\nOutput strict JSON schema:\n");
        sb.append("{ \"matchScore\": <number>, \"headline\": \"<string>\", \"selectedSkills\": [\"<skill_text>\"], \"suggestedSkills\": [\"<missing_skill>\"], \"selectedProjectIds\": [\"<id>\"], \"selectedEducationIds\": [\"<id>\"] }");

        String prompt = sb.toString();
        log.debug("Metadata Prompt: {}", prompt);
        return prompt;
    }

    private String buildExperiencePrompt(UserProfileDto profile, String jd) {
        StringBuilder sb = new StringBuilder();
        sb.append("\nSYSTEM: You are a strict JSON generator. Output raw JSON only. No ```json markdown tags.\n");
        sb.append("TASK: Select relevant experiences and rewrite their descriptions to better match the Job Description keywords. Keep the originalExperienceId exactly as provided.\n");

        sb.append("\n--- JOB DESCRIPTION ---\n").append(jd).append("\n");

        sb.append("\n--- CANDIDATE EXPERIENCES ---\n");
        if (profile.getExperiences() != null) {
            profile.getExperiences().forEach(e ->
                    sb.append("- ID: ").append(e.getId())
                            .append(" | Company: ").append(e.getCompanyName())
                            .append(" | Role: ").append(e.getPosition())
                            .append(" | Duration: ").append(e.getStartDate()).append(" to ").append(e.getEndDate())
                            .append("\n  Original Description: ").append(e.getDescription()).append("\n")
            );
        }

        sb.append("\nOutput strict JSON schema:\n");
        sb.append("{ \"selectedExperiences\": [ { \"originalExperienceId\": \"<exact_id_from_input>\", \"overriddenDescription\": \"<optimized_bullet_points_text>\", \"displayOrder\": <number_priority> } ] }");

        String prompt = sb.toString();
        log.debug("Experience Prompt: {}", prompt);
        return prompt;
    }
}