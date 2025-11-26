package com.example.resume_service.dtos.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RewriteItem {
    
    @JsonProperty("originalId")
    private String originalId;
    
    @JsonProperty("type")
    private String type; // experience, project, skill, education
    
    @JsonProperty("newText")
    private String newText;
}
