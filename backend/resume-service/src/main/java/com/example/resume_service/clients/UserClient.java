package com.example.resume_service.clients;

import com.example.resume_service.dtos.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Component
public class UserClient implements IUserClient {
    
    private static final Logger logger = LoggerFactory.getLogger(UserClient.class);
    private final RestTemplate restTemplate;

    public UserClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public CompletableFuture<UserProfileDto> getUserProfileAsync(String userId) {
        return CompletableFuture.supplyAsync(() -> {
            logger.info("Fetching mock user profile with NOISE data for userId: {}", userId);
            return getMockUserProfile(userId);
        });
    }

//  Dữ liệu user giả
    private UserProfileDto getMockUserProfile(String userId) {
        UserProfileDto profile = new UserProfileDto();
        profile.setId(userId != null ? userId : "user_mixed_skills");
        profile.setFirstName("Nguyễn Văn");
        profile.setLastName("Đa Năng");
        profile.setEmail("danang@email.com");

        // Sửa lại Skills thành List<String>
        profile.setSkills(Arrays.asList("C#", "MongoDB", "ReactJS", "Docker", "Photoshop", "Nấu ăn"));

        // Sửa lại Languages thành List<String>
        profile.setLanguages(Arrays.asList("Tiếng Anh - IELTS 7.0", "Tiếng Nhật - N3"));
        
//        // 3. EDUCATION
//        List<EducationDto> educations = Arrays.asList(
//            new EducationDto(
//                "edu_1", "Đại học Bách Khoa", "Kỹ sư Phần mềm",
//                LocalDate.of(2018, 9, 1, 0, 0), LocalDateTime.of(2022, 6, 1, 0, 0),
//                "GPA: 3.6/4.0"
//            ),
//            // Khóa học không liên quan lắm
//            new EducationDto(
//                "edu_2", "Trung tâm Dạy Nghề Á Âu", "Chứng chỉ Pha chế Barista",
//                LocalDateTime.of(2017, 6, 1, 0, 0), LocalDateTime.of(2017, 9, 1, 0, 0),
//                "Học cách pha chế Espresso và Latte Art."
//            )
//        );
//        profile.setEducations(educations);
        
//        // 4. PROJECTS: Trộn dự án Code và dự án Cá nhân tào lao
//        List<ProjectDto> projects = Arrays.asList(
//            // Dự án Xịn (Tech)
//            new ProjectDto(
//                "proj_1", "E-commerce Microservices",
//                "Xây dựng hệ thống bán hàng với kiến trúc Microservices.",
//                Arrays.asList(".NET Core", "RabbitMQ", "Docker"), "github.com/ecommerce"
//            ),
//            new ProjectDto(
//                "proj_2", "Real-time Chat Application",
//                "Ứng dụng chat realtime với SignalR.",
//                Arrays.asList("C#", "SignalR", "MongoDB"), "github.com/chatapp"
//            ),
//            // Dự án "Rác" (Noise) - AI không nên chọn cái này cho JD lập trình
//            new ProjectDto(
//                "proj_3", "Bộ sưu tập ảnh đường phố",
//                "Chụp ảnh đời sống Sài Gòn và chỉnh sửa bằng Lightroom.",
//                Arrays.asList("Adobe Lightroom", "Photography"), "flickr.com/photos"
//            ),
//            new ProjectDto(
//                "proj_4", "Fanpage Bán Quần Áo",
//                "Quản lý fanpage, chạy quảng cáo Facebook Ads.",
//                Arrays.asList("Facebook Ads", "Content Marketing"), "facebook.com/shop"
//            )
//        );
//        profile.setProjects(projects);
//
//        // 5. EXPERIENCES: Trộn kinh nghiệm Dev và việc làm thêm
//        List<ExperienceDto> experiences = Arrays.asList(
//            // Kinh nghiệm Xịn (Tech)
//            new ExperienceDto(
//                "exp_1", "Backend Developer", "FPT Software",
//                "Phát triển API, tối ưu query MongoDB.",
//                LocalDateTime.of(2022, 7, 1, 0, 0), null
//            ),
//            new ExperienceDto(
//                "exp_2", "Junior Developer", "Techcombank",
//                "Làm việc với .NET Core và SQL Server.",
//                LocalDateTime.of(2021, 1, 15, 0, 0), LocalDateTime.of(2022, 6, 30, 0, 0)
//            ),
//            // Kinh nghiệm "Rác" (Noise) - Việc làm thêm thời sinh viên
//            new ExperienceDto(
//                "exp_3", "Nhân viên phục vụ", "Highlands Coffee",
//                "Order đồ uống, dọn dẹp bàn ghế và phục vụ khách hàng.",
//                LocalDateTime.of(2018, 1, 1, 0, 0), LocalDateTime.of(2019, 1, 1, 0, 0)
//            ),
//            new ExperienceDto(
//                "exp_4", "Thực tập sinh Marketing", "Agency XYZ",
//                "Viết content cho fanpage, hỗ trợ tổ chức sự kiện.",
//                LocalDateTime.of(2019, 6, 1, 0, 0), LocalDateTime.of(2019, 9, 1, 0, 0)
//            )
//        );
//        profile.setExperiences(experiences);
        
        return profile;
    }
}