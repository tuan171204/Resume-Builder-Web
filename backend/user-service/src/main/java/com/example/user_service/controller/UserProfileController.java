package com.example.user_service.controller;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.request.UserUpdateRequest;
import com.example.user_service.dto.response.ApiResponse;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserProfileController {
    UserProfileService userProfileService;

    @PostMapping("/users")
    UserProfileResponse createUser(@RequestBody UserCreationRequest request){
        return userProfileService.createUserProfile(request);
    }

    @GetMapping("/users/{userId}")
    UserProfileResponse getUser(@PathVariable String userId){
        return userProfileService.getUserProfile(userId);
    }

    @PutMapping("/users/{userId}")
    ApiResponse<UserProfileResponse> updateProfile(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserProfileResponse>builder()
                .result(userProfileService.updateUserProfile(userId, request))
                .build();
    }

    @GetMapping
    ApiResponse<List<UserProfileResponse>> getAllProfiles() {
        return ApiResponse.<List<UserProfileResponse>>builder()
                .result(userProfileService.getAllProfiles())
                .build();
    }
}
