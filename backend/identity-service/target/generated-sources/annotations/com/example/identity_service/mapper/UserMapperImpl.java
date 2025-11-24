package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.dto.request.UserUpdateRequest;
import com.example.identity_service.dto.response.UserResponse;
import com.example.identity_service.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setDob( request.getDob() );
        user.setEmail( request.getEmail() );
        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
        user.setPassword( request.getPassword() );
        user.setPhoneNumber( request.getPhoneNumber() );
        user.setUsername( request.getUsername() );

        return user;
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.createdAt( user.getCreatedAt() );
        userResponse.dob( user.getDob() );
        userResponse.email( user.getEmail() );
        userResponse.firstName( user.getFirstName() );
        userResponse.id( user.getId() );
        userResponse.isActive( user.getIsActive() );
        userResponse.lastName( user.getLastName() );
        userResponse.phoneNumber( user.getPhoneNumber() );
        userResponse.updatedAt( user.getUpdatedAt() );
        userResponse.username( user.getUsername() );

        return userResponse.build();
    }

    @Override
    public void updateUser(User user, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        user.setDob( request.getDob() );
        user.setEmail( request.getEmail() );
        user.setFirstName( request.getFirstName() );
        user.setIsActive( request.getIsActive() );
        user.setLastName( request.getLastName() );
        user.setPassword( request.getPassword() );
        user.setPhoneNumber( request.getPhoneNumber() );
    }
}
