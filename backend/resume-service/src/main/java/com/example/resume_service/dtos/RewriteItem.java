package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RewriteItem {
    
    @JsonProperty("originalId")
    private String originalId;
    
    @JsonProperty("type")
    private String type; // experience, project, skill, education
    
    @JsonProperty("newText")
    private String newText;

    public RewriteItem() {}
    
    public RewriteItem(String originalId, String type, String newText) {
        this.originalId = originalId;
        this.type = type;
        this.newText = newText;
    }

    // Getters and Setters
    public String getOriginalId() { return originalId; }
    public void setOriginalId(String originalId) { this.originalId = originalId; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getNewText() { return newText; }
    public void setNewText(String newText) { this.newText = newText; }
}
