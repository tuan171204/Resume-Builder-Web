package com.example.user_service.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.neo4j.core.schema.CompositeProperty;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.support.UUIDStringGenerator;

import java.time.LocalDate;
import java.util.List;

@Node("UserProject")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProject {

    @org.springframework.data.neo4j.core.schema.Id
    @GeneratedValue(generatorClass = UUIDStringGenerator.class)
    String id;

    String name;
    String description;
    LocalDate startDate;
    LocalDate endDate;

    List<String> technologies;
}