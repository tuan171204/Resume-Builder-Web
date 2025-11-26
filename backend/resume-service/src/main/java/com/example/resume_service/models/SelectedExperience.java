package com.example.resume_service.models;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SelectedExperience {
    
    @Field("originalExperienceId")
    private String originalExperienceId;
    
    @Field("overriddenDescription")
    private String overriddenDescription;
    
    @Field("displayOrder")
    private Integer displayOrder;
}
