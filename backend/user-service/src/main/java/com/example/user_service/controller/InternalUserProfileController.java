package com.example.user_service.controller;

import com.example.user_service.dto.request.UserCreationRequest;
import com.example.user_service.dto.response.UserProfileResponse;
import com.example.user_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InternalUserProfileController {
    UserProfileService userProfileService;

    @PostMapping("/users")
    UserProfileResponse createUser(@RequestBody UserCreationRequest request){
        return userProfileService.createUserProfile(request);
    }
}
