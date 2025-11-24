package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProfileCreationRequest;
import com.example.identity_service.dto.request.UserCreationRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.6.3, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        ProfileCreationRequest.ProfileCreationRequestBuilder profileCreationRequest = ProfileCreationRequest.builder();

        profileCreationRequest.firstName( request.getFirstName() );
        profileCreationRequest.lastName( request.getLastName() );
        profileCreationRequest.phoneNumber( request.getPhoneNumber() );
        profileCreationRequest.email( request.getEmail() );
        profileCreationRequest.dob( request.getDob() );

        return profileCreationRequest.build();
    }
}
