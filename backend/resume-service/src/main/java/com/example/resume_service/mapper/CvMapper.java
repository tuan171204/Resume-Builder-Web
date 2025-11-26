package com.example.resume_service.mapper;

import com.example.resume_service.dtos.response.GenerateResumeResponse;
import com.example.resume_service.models.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CvMapper {
    GenerateResumeResponse convertResumeToResponse(Resume resume);
}
