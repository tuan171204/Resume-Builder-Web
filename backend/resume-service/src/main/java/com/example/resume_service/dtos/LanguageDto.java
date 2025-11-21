package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LanguageDto {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("proficiency")
    private String proficiency;

    public LanguageDto() {}
    
    public LanguageDto(String id, String name, String proficiency) {
        this.id = id;
        this.name = name;
        this.proficiency = proficiency;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getProficiency() { return proficiency; }
    public void setProficiency(String proficiency) { this.proficiency = proficiency; }
}
