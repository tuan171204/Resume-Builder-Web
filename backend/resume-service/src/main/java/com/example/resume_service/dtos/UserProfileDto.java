package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class UserProfileDto {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("fullName")
    private String fullName;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("headline")
    private String headline;
    
    @JsonProperty("skills")
    private List<SkillDto> skills;
    
    @JsonProperty("languages")
    private List<LanguageDto> languages;
    
    @JsonProperty("educations")
    private List<EducationDto> educations;
    
    @JsonProperty("projects")
    private List<ProjectDto> projects;
    
    @JsonProperty("experiences")
    private List<ExperienceDto> experiences;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
    
    public List<SkillDto> getSkills() { return skills; }
    public void setSkills(List<SkillDto> skills) { this.skills = skills; }
    
    public List<LanguageDto> getLanguages() { return languages; }
    public void setLanguages(List<LanguageDto> languages) { this.languages = languages; }
    
    public List<EducationDto> getEducations() { return educations; }
    public void setEducations(List<EducationDto> educations) { this.educations = educations; }
    
    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }
    
    public List<ExperienceDto> getExperiences() { return experiences; }
    public void setExperiences(List<ExperienceDto> experiences) { this.experiences = experiences; }
}
