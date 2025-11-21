package com.example.resume_service.clients;

import com.example.resume_service.dtos.UserProfileDto;
import java.util.concurrent.CompletableFuture;

public interface IUserClient {
    CompletableFuture<UserProfileDto> getUserProfileAsync(String userId);
}
