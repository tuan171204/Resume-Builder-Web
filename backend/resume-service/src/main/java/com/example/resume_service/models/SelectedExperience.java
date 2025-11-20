package com.example.resume_service.models;

import org.springframework.data.mongodb.core.mapping.Field;

public class SelectedExperience {
    
    @Field("originalExperienceId")
    private String originalExperienceId;
    
    @Field("overriddenDescription")
    private String overriddenDescription;
    
    @Field("displayOrder")
    private Integer displayOrder;

    // Constructors
    public SelectedExperience() {}
    
    public SelectedExperience(String originalExperienceId, String overriddenDescription, Integer displayOrder) {
        this.originalExperienceId = originalExperienceId;
        this.overriddenDescription = overriddenDescription;
        this.displayOrder = displayOrder;
    }

    // Getters and Setters
    public String getOriginalExperienceId() { return originalExperienceId; }
    public void setOriginalExperienceId(String originalExperienceId) { 
        this.originalExperienceId = originalExperienceId; 
    }
    
    public String getOverriddenDescription() { return overriddenDescription; }
    public void setOverriddenDescription(String overriddenDescription) { 
        this.overriddenDescription = overriddenDescription; 
    }
    
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
