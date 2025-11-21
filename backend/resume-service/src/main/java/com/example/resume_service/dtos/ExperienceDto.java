package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class ExperienceDto {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("jobTitle")
    private String jobTitle;
    
    @JsonProperty("company")
    private String company;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("startDate")
    private LocalDateTime startDate;
    
    @JsonProperty("endDate")
    private LocalDateTime endDate;

    public ExperienceDto() {}
    
    public ExperienceDto(String id, String jobTitle, String company, String description, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.company = company;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
}
