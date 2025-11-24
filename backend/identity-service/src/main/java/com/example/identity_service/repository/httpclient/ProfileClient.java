package com.example.identity_service.repository.httpclient;

import com.example.identity_service.configuration.AuthenticationRequestInterceptor;
import com.example.identity_service.dto.request.ProfileCreationRequest;
import com.example.identity_service.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@FeignClient(name = "user-service", url = "${app.services.profile}", configuration = {AuthenticationRequestInterceptor.class})
public interface ProfileClient {
    @PostMapping(value = "/internal/users", produces = MediaType.APPLICATION_JSON_VALUE)
    UserProfileResponse createProfile(
            @RequestBody ProfileCreationRequest request);
}
