package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GenerateResumeRequest {
    
    @JsonProperty("userId")
    private String userId;
    
    @JsonProperty("jobDescription")
    private String jobDescription;

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
}
