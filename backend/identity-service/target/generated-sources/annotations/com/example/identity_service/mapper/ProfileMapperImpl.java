package com.example.identity_service.mapper;

import com.example.identity_service.dto.request.ProfileCreationRequest;
import com.example.identity_service.dto.request.UserCreationRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        ProfileCreationRequest.ProfileCreationRequestBuilder profileCreationRequest = ProfileCreationRequest.builder();

        profileCreationRequest.dob( request.getDob() );
        profileCreationRequest.email( request.getEmail() );
        profileCreationRequest.firstName( request.getFirstName() );
        profileCreationRequest.lastName( request.getLastName() );
        profileCreationRequest.phoneNumber( request.getPhoneNumber() );

        return profileCreationRequest.build();
    }
}
