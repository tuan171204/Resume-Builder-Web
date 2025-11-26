package com.example.resume_service.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GenerateResumeRequest {
    
    @JsonProperty("userId")
    private String userId;
    
    @JsonProperty("jobDescription")
    private String jobDescription;
}
