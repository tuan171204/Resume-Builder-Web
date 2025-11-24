package com.example.user_service.mapper;


import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.entity.UserProfile;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserProfile toUserProfile(UserCreationRequest request){
        if (request == null) {
            return null;
        }

        UserProfile userProfile = new UserProfile();

        userProfile.setUserId(request.getUserId());
        userProfile.setFirstName(request.getFirstName());
        userProfile.setLastName(request.getLastName());
        userProfile.setPhoneNumber(request.getPhoneNumber());
        userProfile.setEmail(request.getEmail());
        userProfile.setDob(request.getDob());

        return userProfile;
    }

    public UserProfileResponse toUserProfileResponse(UserProfile entity){
        if (entity == null) {
            return null;
        }

        UserProfileResponse userProfileResponse = new UserProfileResponse();

        userProfileResponse.setId(entity.getId());
        userProfileResponse.setUserId(entity.getUserId());
        userProfileResponse.setFirstName(entity.getFirstName());
        userProfileResponse.setLastName(entity.getLastName());
        userProfileResponse.setPhoneNumber(entity.getPhoneNumber());
        userProfileResponse.setEmail(entity.getEmail());
        userProfileResponse.setDob(entity.getDob());
        userProfileResponse.setCreatedAt(entity.getCreatedAt());
        userProfileResponse.setUpdatedAt(entity.getUpdatedAt());
        userProfileResponse.setIsActive(entity.getIsActive());
        userProfileResponse.setSubscriptionPlan(entity.getSubscriptionPlan());

        return userProfileResponse;
    }
}
