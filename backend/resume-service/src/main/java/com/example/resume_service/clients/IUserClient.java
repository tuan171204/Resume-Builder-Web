package com.example.resume_service.clients;

import com.example.resume_service.config.AuthenticationRequestInterceptor;
import com.example.resume_service.dtos.dto.UserProfileDto;
import com.example.resume_service.dtos.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.concurrent.CompletableFuture;

public interface IUserClient {
    CompletableFuture<UserProfileDto> getUserProfileAsync(String userId);

}
