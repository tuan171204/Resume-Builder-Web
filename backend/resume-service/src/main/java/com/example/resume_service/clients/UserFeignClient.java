package com.example.resume_service.clients;

import com.example.resume_service.config.AuthenticationRequestInterceptor;
import com.example.resume_service.dtos.dto.UserProfileDto;
import com.example.resume_service.dtos.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.concurrent.CompletableFuture;

@FeignClient(name = "user-service", url = "${app.services.profile}", configuration = { AuthenticationRequestInterceptor.class })
public interface UserFeignClient {
    @GetMapping("/users/{userId}")
    UserProfileDto getUserProfileAsync(@PathVariable("userId") String userId);

    @GetMapping("/users/{userId}")
    ApiResponse<UserProfileDto> getUserProfile(@PathVariable("userId") String userId);

}
