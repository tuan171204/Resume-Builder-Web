package com.example.user_service.mapper;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.request.UserUpdateRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserProfile toUserProfile(UserCreationRequest request);

    UserProfileResponse toUserProfileResponse(UserProfile entity);

    void updateUser(@MappingTarget UserProfile userProfile, UserUpdateRequest request);
}
