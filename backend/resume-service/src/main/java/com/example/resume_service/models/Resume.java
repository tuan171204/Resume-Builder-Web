package com.example.resume_service.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "Resumes")
public class Resume {
    
    @Id
    private String id;
    
    @Field("userId")
    private String userId;
    
    @Field("fullName")
    private String fullName;
    
    @Field("email")
    private String email;
    
    @Field("headline")
    private String headline;
    
    @Field("jobDescription")
    private String jobDescription;
    
    @Field("matchScore")
    private Double matchScore;
    
    @Field("selectedExperiences")
    private List<SelectedExperience> selectedExperiences;
    
    @Field("selectedSkills")
    private List<String> selectedSkills;
    
    @Field("selectedEducations")
    private List<String> selectedEducations;
    
    @Field("skills")
    private List<String> skills;
    
    @Field("educations")
    private List<String> educations;
    
    @Field("languages")
    private List<String> languages;
    
    @Field("projects")
    private List<String> projects;
    
    @Field("createdAt")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Field("updatedAt")
    private LocalDateTime updatedAt = LocalDateTime.now();

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
    
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    
    public List<String> getEducations() { return educations; }
    public void setEducations(List<String> educations) { this.educations = educations; }
    
    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }
    
    public List<String> getProjects() { return projects; }
    public void setProjects(List<String> projects) { this.projects = projects; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
