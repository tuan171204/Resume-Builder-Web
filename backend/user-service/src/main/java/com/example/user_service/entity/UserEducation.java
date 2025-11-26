package com.example.user_service.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDate;

@Node("UserEducation")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserEducation {

    @org.springframework.data.neo4j.core.schema.Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    String id;

    String schoolName;
    String degree;
    String fieldOfStudy;
    LocalDate startDate;
    LocalDate endDate;
    String description;
}