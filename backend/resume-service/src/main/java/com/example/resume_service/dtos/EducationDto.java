package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class EducationDto {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("school")
    private String school;
    
    @JsonProperty("degree")
    private String degree;
    
    @JsonProperty("startDate")
    private LocalDateTime startDate;
    
    @JsonProperty("endDate")
    private LocalDateTime endDate;
    
    @JsonProperty("description")
    private String description;

    public EducationDto() {}
    
    public EducationDto(String id, String school, String degree, LocalDateTime startDate, LocalDateTime endDate, String description) {
        this.id = id;
        this.school = school;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
