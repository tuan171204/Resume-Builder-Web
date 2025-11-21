package com.example.resume_service.services;

import com.example.resume_service.dtos.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class GeminiService implements IGeminiService {
    
    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);
    
    @Value("${openrouter.api-url:https://openrouter.ai/api/v1/chat/completions}")
    private String apiUrl;
    
    @Value("${openrouter.api-key}")
    private String apiKey;

    @Value("${openrouter.model:google/gemini-2.0-flash-exp:free}")
    private String modelName;
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public CompletableFuture<AnalysisResult> analyzeAndRewriteAsync(UserProfileDto userProfile, String jobDescription) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                logger.info("Starting Gemini AI analysis for user: {}", userProfile.getId());

                // Validate inputs
                if (userProfile == null || userProfile.getExperiences() == null) {
                    logger.warn("Invalid user profile provided");
                    return createMockAnalysisResult();
                }

                if (jobDescription == null || jobDescription.isBlank()) {
                    logger.warn("Job description is empty");
                    return createMockAnalysisResult();
                }

                // Build full prompt from user profile and job description
                String fullPrompt = buildFullPrompt(userProfile, jobDescription);
                logger.debug("Prompt built successfully. Length: {}", fullPrompt.length());

                // Create OpenAI-compatible request for OpenRouter
                Map<String, Object> requestBody = buildOpenAiRequest(fullPrompt);

                // Prepare headers with Authorization
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.set("Authorization", "Bearer " + apiKey);

                // Create request entity
                HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

                logger.info("Sending request to OpenRouter API: {}", apiUrl);

                // Send request to OpenRouter API
                ResponseEntity<Map> responseEntity = restTemplate.postForEntity(
                        apiUrl,
                        requestEntity,
                        Map.class
                );

                if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                    logger.error("OpenRouter API error status: {}", responseEntity.getStatusCode());
                    return createMockAnalysisResult();
                }

                Map response = responseEntity.getBody();
                if (response == null) {
                    logger.error("Empty response from OpenRouter API");
                    return createMockAnalysisResult();
                }

                // Extract text response from OpenAI format
                List<Map> choices = (List<Map>) response.get("choices");
                if (choices == null || choices.isEmpty()) {
                    logger.error("No choices in OpenRouter response");
                    return createMockAnalysisResult();
                }

                Map message = (Map) choices.get(0).get("message");
                String responseText = (String) message.get("content");

                if (responseText == null || responseText.isBlank()) {
                    logger.error("No text content in OpenRouter response");
                    return createMockAnalysisResult();
                }

                logger.info("Raw OpenRouter response received. Length: {}", responseText.length());
                logger.debug("Response content: {}", responseText);

                // Parse JSON response (clean markdown if present)
                AnalysisResult result = parseJsonResponse(responseText);

                if (result != null) {
                    logger.info("Analysis complete. Score: {}, Rewrites: {}", 
                            result.getScore(), 
                            result.getRewrites().size());
                    return result;
                }

                logger.warn("Failed to parse OpenRouter response as JSON, using mock result");
                return createMockAnalysisResult();

            } catch (Exception ex) {
                logger.error("Error in Gemini analysis: {}", ex.getMessage(), ex);
                return createMockAnalysisResult();
            }
        });
    }

    /**
     * Build OpenAI-compatible request for OpenRouter
     */
    private Map<String, Object> buildOpenAiRequest(String userPrompt) {
        Map<String, Object> request = new LinkedHashMap<>();
        
        // Model
        request.put("model", modelName);
        
        // Messages
        List<Map<String, String>> messages = new ArrayList<>();
        
        // System message
        Map<String, String> systemMsg = new LinkedHashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", "You are an expert recruiter and CV optimizer. Analyze the candidate profile and provide a match score (0-100) and rewritten experience descriptions.");
        messages.add(systemMsg);
        
        // User message
        Map<String, String> userMsg = new LinkedHashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", userPrompt);
        messages.add(userMsg);
        
        request.put("messages", messages);
        
        // Temperature
        request.put("temperature", 0.7);
        
        // Max tokens
        request.put("max_tokens", 2048);
        
        return request;
    }

    /**
     * Build comprehensive prompt combining user profile and job description
     */
    private String buildFullPrompt(UserProfileDto userProfile, String jobDescription) {
        StringBuilder prompt = new StringBuilder();

        // System instruction
        prompt.append("You are an expert recruiter and CV optimizer. ");
        prompt.append("Analyze the candidate profile against the job description and provide a match score (0-100) ");
        prompt.append("and rewritten experience descriptions that better align with the job requirements.\n\n");

        // User profile section
        prompt.append("=== CANDIDATE PROFILE ===\n");
        prompt.append("Name: ").append(userProfile.getFullName()).append("\n");
        prompt.append("Email: ").append(userProfile.getEmail()).append("\n");
        prompt.append("Headline: ").append(userProfile.getHeadline()).append("\n");

        // Experiences section
        prompt.append("\nExperiences:\n");
        if (userProfile.getExperiences() != null && !userProfile.getExperiences().isEmpty()) {
            for (ExperienceDto exp : userProfile.getExperiences()) {
                prompt.append("- ID: ").append(exp.getId()).append("\n");
                prompt.append("  Company: ").append(exp.getCompany()).append("\n");
                prompt.append("  Position: ").append(exp.getJobTitle()).append("\n");
                prompt.append("  Duration: ").append(formatDate(exp.getStartDate()))
                        .append(" to ").append(exp.getEndDate() != null ? formatDate(exp.getEndDate()) : "Present")
                        .append("\n");
                prompt.append("  Description: ").append(exp.getDescription()).append("\n\n");
            }
        }

        // Projects section
        prompt.append("\nProjects:\n");
        if (userProfile.getProjects() != null && !userProfile.getProjects().isEmpty()) {
            for (ProjectDto proj : userProfile.getProjects()) {
                prompt.append("- ID: ").append(proj.getId()).append("\n");
                prompt.append("  Name: ").append(proj.getName()).append("\n");
                prompt.append("  Tech: ").append(String.join(", ", proj.getTechnologies())).append("\n");
                prompt.append("  Description: ").append(proj.getDescription()).append("\n\n");
            }
        }

        // Education section
        prompt.append("\nEducation:\n");
        if (userProfile.getEducations() != null && !userProfile.getEducations().isEmpty()) {
            for (EducationDto edu : userProfile.getEducations()) {
                prompt.append("- ").append(edu.getDegree())
                        .append(" from ").append(edu.getSchool()).append("\n");
            }
        }

        // Skills section
        prompt.append("\nSkills: ");
        if (userProfile.getSkills() != null && !userProfile.getSkills().isEmpty()) {
            prompt.append(String.join(", ", userProfile.getSkills().stream().map(SkillDto::getName).toList()));
        }
        prompt.append("\n\n");

        // Job description section
        prompt.append("=== JOB DESCRIPTION ===\n");
        prompt.append(jobDescription).append("\n\n");

        // Instructions for response format
        prompt.append("=== ANALYSIS INSTRUCTIONS ===\n");
        prompt.append("1. Analyze how well the candidate matches the job requirements\n");
        prompt.append("2. Provide a match score from 0-100\n");
        prompt.append("3. Identify MOST RELEVANT experiences/projects that match the JD (typically 2-4 items)\n");
        prompt.append("4. For each selected experience/project, rewrite to emphasize relevant keywords from the JD\n");
        prompt.append("5. Select the TOP 3-5 skills that match the JD requirements\n");
        prompt.append("6. Select relevant education if it strengthens the candidacy\n");
        prompt.append("7. Return ONLY valid JSON (no markdown, no code blocks) in this exact format:\n");
        prompt.append("{\n");
        prompt.append("  \"score\": <number 0-100>,\n");
        prompt.append("  \"rewrites\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"originalId\": \"<exp_1|proj_1|skill_1|edu_1>\",\n");
        prompt.append("      \"type\": \"experience|project|skill|education\",\n");
        prompt.append("      \"newText\": \"<rewritten description emphasizing JD keywords>\"\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n\n");

        return prompt.toString();
    }

    /**
     * Parse JSON response from Gemini, cleaning markdown code blocks if present
     */
    private AnalysisResult parseJsonResponse(String content) {
        try {
            String jsonContent = content.trim();

            // Remove markdown code block markers if present
            if (jsonContent.startsWith("```json")) {
                jsonContent = jsonContent.substring(7);
            } else if (jsonContent.startsWith("```")) {
                jsonContent = jsonContent.substring(3);
            }

            if (jsonContent.endsWith("```")) {
                jsonContent = jsonContent.substring(0, jsonContent.length() - 3);
            }

            jsonContent = jsonContent.trim();

            logger.debug("Cleaned JSON content: {}", jsonContent);

            // Parse JSON
            AnalysisResult result = objectMapper.readValue(jsonContent, AnalysisResult.class);
            logger.info("Successfully parsed analysis result. Score: {}", result.getScore());
            return result;

        } catch (Exception ex) {
            logger.error("Error parsing JSON response: {}. Content: {}", ex.getMessage(), content);
            return null;
        }
    }

    /**
     * Create mock analysis result for fallback
     */
    private AnalysisResult createMockAnalysisResult() {
        logger.info("Creating mock analysis result");

        AnalysisResult result = new AnalysisResult();
        result.setScore(75.0);

        List<RewriteItem> rewrites = new ArrayList<>();

        RewriteItem rewrite1 = new RewriteItem("exp_1", "experience", 
            "Led development of scalable microservices architecture using modern technologies. " +
            "Collaborated with cross-functional teams to deliver high-quality solutions.");
        
        RewriteItem rewrite2 = new RewriteItem("skill_4", "skill", "Docker - containerization expert");
        RewriteItem rewrite3 = new RewriteItem("skill_5", "skill", "Microservices architecture design");

        rewrites.add(rewrite1);
        rewrites.add(rewrite2);
        rewrites.add(rewrite3);
        result.setRewrites(rewrites);

        return result;
    }

    /**
     * Format date to readable string
     */
    private String formatDate(LocalDateTime date) {
        if (date == null) return "Unknown";
        return date.getYear() + "-" + String.format("%02d", date.getMonthValue());
    }
}