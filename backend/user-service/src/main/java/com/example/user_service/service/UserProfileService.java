package com.example.user_service.service;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.request.UserUpdateRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.entity.UserProfile;
import com.example.user_service.mapper.UserMapper;
import com.example.user_service.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserProfileService {
    UserProfileRepository userProfileRepository;
    UserMapper userMapper;

    public UserProfileResponse createUserProfile(UserCreationRequest request){
        UserProfile userProfile = userMapper.toUserProfile(request);
        userProfile = userProfileRepository.save(userProfile);

        return userMapper.toUserProfileResponse(userProfile);
    }

    public UserProfileResponse getUserProfile(String id){
        UserProfile userProfile = userProfileRepository.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return userMapper.toUserProfileResponse(userProfile);
    }

    public List<UserProfileResponse> getAllProfiles() {
        var profiles = userProfileRepository.findAll();
        return profiles.stream().map(userMapper::toUserProfileResponse).toList();
    }

    @Transactional // Đảm bảo tính toàn vẹn dữ liệu khi update nhiều bảng
    public UserProfileResponse updateUserProfile(String userId, UserUpdateRequest request) {
        UserProfile userProfile = userProfileRepository.findByUserId(userId) // Hoặc findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found"));

        // 2. Sử dụng Mapper để update thông tin từ request vào entity
        userMapper.updateUser(userProfile, request);

        // 3. Lưu lại (JPA sẽ tự động xử lý update các bảng con nhờ CascadeType.ALL)
        userProfile = userProfileRepository.save(userProfile);

        return userMapper.toUserProfileResponse(userProfile);
    }
}
