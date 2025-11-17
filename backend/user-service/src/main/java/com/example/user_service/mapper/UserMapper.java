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

        userProfile.setFirstName(request.getFirstName());
        userProfile.setLastName(request.getLastName());
        userProfile.setPhoneNumber(request.getPhoneNumber());

        return userProfile;
    }

    public UserProfileResponse toUserProfileResponse(UserProfile entity){
        if (entity == null) {
            return null;
        }

        UserProfileResponse userProfileResponse = new UserProfileResponse();

        userProfileResponse.setId(entity.getId());
        userProfileResponse.setFirstName(entity.getFirstName());
        userProfileResponse.setLastName(entity.getLastName());
        userProfileResponse.setPhoneNumber(entity.getPhoneNumber());

        return userProfileResponse;
    }
}
