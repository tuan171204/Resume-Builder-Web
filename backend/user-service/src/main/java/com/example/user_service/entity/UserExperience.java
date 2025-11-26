package com.example.user_service.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDate;

@Node("UserExperience")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserExperience {
    @Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    String id;

    String companyName;
    String position;
    LocalDate startDate;
    LocalDate endDate;
    String description;
}