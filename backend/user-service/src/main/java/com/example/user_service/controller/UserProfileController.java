package com.example.user_service.controller;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.service.UserProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping("/users")
    UserProfileResponse createUser(@RequestBody UserCreationRequest request){
        return userProfileService.createUserProfile(request);
    }

    @GetMapping("/users/{userId}")
    UserProfileResponse getUser(@PathVariable String userId){
        return userProfileService.getUserProfile(userId);
    }
}
