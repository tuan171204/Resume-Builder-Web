package com.example.resume_service.dtos;

import com.example.resume_service.models.SelectedExperience;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.List;

public class GenerateResumeResponse {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("userId")
    private String userId;
    
    @JsonProperty("fullName")
    private String fullName;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("headline")
    private String headline;
    
    @JsonProperty("jobDescription")
    private String jobDescription;
    
    @JsonProperty("matchScore")
    private Double matchScore;
    
    @JsonProperty("selectedExperiences")
    private List<SelectedExperience> selectedExperiences;
    
    @JsonProperty("selectedSkills")
    private List<String> selectedSkills;
    
    @JsonProperty("selectedEducations")
    private List<String> selectedEducations;
    
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;
    
    @JsonProperty("updatedAt")
    private LocalDateTime updatedAt;

    // Constructors
    public GenerateResumeResponse() {}

    public GenerateResumeResponse(String id, String userId, String fullName, String email, 
                                   String headline, String jobDescription, Double matchScore,
                                   List<SelectedExperience> selectedExperiences,
                                   List<String> selectedSkills, List<String> selectedEducations,
                                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.headline = headline;
        this.jobDescription = jobDescription;
        this.matchScore = matchScore;
        this.selectedExperiences = selectedExperiences;
        this.selectedSkills = selectedSkills;
        this.selectedEducations = selectedEducations;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }

    public Double getMatchScore() { return matchScore; }
    public void setMatchScore(Double matchScore) { this.matchScore = matchScore; }

    public List<SelectedExperience> getSelectedExperiences() { return selectedExperiences; }
    public void setSelectedExperiences(List<SelectedExperience> selectedExperiences) { 
        this.selectedExperiences = selectedExperiences; 
    }

    public List<String> getSelectedSkills() { return selectedSkills; }
    public void setSelectedSkills(List<String> selectedSkills) { 
        this.selectedSkills = selectedSkills; 
    }

    public List<String> getSelectedEducations() { return selectedEducations; }
    public void setSelectedEducations(List<String> selectedEducations) { 
        this.selectedEducations = selectedEducations; 
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
