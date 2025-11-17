package com.example.user_service.service;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.entity.UserProfile;
import com.example.user_service.mapper.UserMapper;
import com.example.user_service.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final UserMapper userMapper;

    public UserProfileService(UserProfileRepository userProfileRepository, UserMapper userMapper) {
        this.userProfileRepository = userProfileRepository;
        this.userMapper = userMapper;
    }

    public UserProfileResponse createUserProfile(UserCreationRequest request){
        UserProfile userProfile = userMapper.toUserProfile(request);
        userProfile = userProfileRepository.save(userProfile);

        return userMapper.toUserProfileResponse(userProfile);
    }

    public UserProfileResponse getUserProfile(String id){
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return userMapper.toUserProfileResponse(userProfile);
    }
}
