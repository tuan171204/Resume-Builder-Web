package com.example.resume_service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ProjectDto {
    
    @JsonProperty("id")
    private String id;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("description")
    private String description;
    
    @JsonProperty("technologies")
    private List<String> technologies;
    
    @JsonProperty("url")
    private String url;

    public ProjectDto() {}
    
    public ProjectDto(String id, String name, String description, List<String> technologies, String url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.technologies = technologies;
        this.url = url;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
    
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
