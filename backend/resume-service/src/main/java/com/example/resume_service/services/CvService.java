package com.example.resume_service.services;

import com.example.resume_service.clients.IUserClient;
import com.example.resume_service.dtos.*;
import com.example.resume_service.models.Resume;
import com.example.resume_service.models.SelectedExperience;
import com.example.resume_service.repositories.ResumeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class CvService implements ICvService {
    
    private static final Logger logger = LoggerFactory.getLogger(CvService.class);
    
    private final ResumeRepository resumeRepository;
    private final IUserClient userClient;
    private final IGeminiService aiService; // Interface chuẩn

    public CvService(ResumeRepository resumeRepository, IUserClient userClient, IGeminiService aiService) {
        this.resumeRepository = resumeRepository;
        this.userClient = userClient;
        this.aiService = aiService;
    }

    @Override
    public CompletableFuture<Resume> generateResumeAsync(GenerateResumeRequest request) {
        logger.info("Starting CV generation for userId: {}", request.getUserId());

        return userClient.getUserProfileAsync(request.getUserId())
            .thenCompose(userProfile -> {
                if (userProfile == null) {
                    logger.error("Failed to fetch user profile for userId: {}", request.getUserId());
                    return CompletableFuture.completedFuture(null);
                }

                return aiService.analyzeAndRewriteAsync(userProfile, request.getJobDescription())
                    .thenApply(analysisResult -> {
                        if (analysisResult == null) {
                            logger.error("Failed to get analysis from AI");
                            return null;
                        }

                        // Tạo object Resume
                        Resume resume = new Resume();
                        resume.setUserId(request.getUserId());
                        resume.setFullName(userProfile.getFullName());
                        resume.setEmail(userProfile.getEmail());
                        resume.setHeadline(userProfile.getHeadline());
                        resume.setJobDescription(request.getJobDescription());
                        resume.setMatchScore(analysisResult.getScore());
                        
                        // 1. Map Kinh nghiệm & Dự án (Chỉ lưu cái AI chọn)
                        resume.setSelectedExperiences(
                            mapExperiencesToSelected(userProfile, analysisResult.getRewrites())
                        );
                        
                        // 2. Map Kỹ năng (Chỉ lưu cái AI chọn)
                        resume.setSelectedSkills(
                            mapSelectedSkills(userProfile, analysisResult.getRewrites())
                        );
                        
                        // 3. Map Học vấn (Chỉ lưu cái AI chọn)
                        resume.setSelectedEducations(
                            mapSelectedEducations(userProfile, analysisResult.getRewrites())
                        );

                        // Lưu vào MongoDB
                        Resume savedResume = resumeRepository.save(resume);
                        logger.info("Resume created successfully with ID: {}", savedResume.getId());

                        return savedResume;
                    });
            })
            .exceptionally(ex -> {
                logger.error("Error generating resume: {}", ex.getMessage());
                return null;
            });
    }

    @Override
    public Resume getResume(String resumeId) {
        return resumeRepository.findById(resumeId).orElse(null);
    }

    @Override
    public List<Resume> getResumesByUser(String userId) {
        return resumeRepository.findByUserId(userId);
    }

    // --- CÁC HÀM MAP DỮ LIỆU ---

    // 1. Map Kinh nghiệm/Dự án
    private List<SelectedExperience> mapExperiencesToSelected(UserProfileDto profile, List<RewriteItem> rewrites) {
        List<SelectedExperience> selectedList = new ArrayList<>();
        if (rewrites == null || rewrites.isEmpty()) return selectedList;

        int order = 1;
        for (RewriteItem rewrite : rewrites) {
            String originalId = rewrite.getOriginalId();
            String type = rewrite.getType() != null ? rewrite.getType() : "";
            
            // Bỏ qua nếu là skill hoặc education (xử lý ở hàm khác)
            if ("skill".equals(type) || "education".equals(type)) continue;

            boolean found = false;

            // Tìm trong KINH NGHIỆM
            if (profile.getExperiences() != null) {
                for (ExperienceDto exp : profile.getExperiences()) {
                    if (exp.getId().equals(originalId)) {
                        SelectedExperience select = new SelectedExperience();
                        select.setOriginalExperienceId(originalId);
                        select.setOverriddenDescription(rewrite.getNewText());
                        select.setDisplayOrder(order++);
                        selectedList.add(select);
                        found = true;
                        break;
                    }
                }
            }

            // Tìm trong DỰ ÁN
            if (!found && profile.getProjects() != null) {
                for (ProjectDto proj : profile.getProjects()) {
                    if (proj.getId().equals(originalId)) {
                        SelectedExperience select = new SelectedExperience();
                        select.setOriginalExperienceId(originalId);
                        // AI viết lại mô tả dự án -> lưu vào overriddenDescription
                        select.setOverriddenDescription(rewrite.getNewText());
                        select.setDisplayOrder(order++);
                        selectedList.add(select);
                        found = true;
                        break;
                    }
                }
            }
        }
        return selectedList;
    }

    // 2. Map Kỹ năng (Chỉ lấy những skill có trong danh sách rewrites)
    private List<String> mapSelectedSkills(UserProfileDto profile, List<RewriteItem> rewrites) {
        List<String> selectedSkills = new ArrayList<>();
        if (rewrites == null || rewrites.isEmpty()) return selectedSkills;

        // Gom các ID skill được chọn vào Set để tìm cho nhanh
        Set<String> selectedSkillIds = new HashSet<>();
        for (RewriteItem item : rewrites) {
            if ("skill".equals(item.getType())) {
                selectedSkillIds.add(item.getOriginalId());
            }
        }

        if (profile.getSkills() != null) {
            for (SkillDto skill : profile.getSkills()) {
                // Chỉ thêm nếu skill ID nằm trong danh sách AI chọn
                if (selectedSkillIds.contains(skill.getId())) {
                    selectedSkills.add(skill.getName());
                }
            }
        }
        return selectedSkills;
    }

    // 3. Map Học vấn (Chỉ lấy những education có trong danh sách rewrites)
    private List<String> mapSelectedEducations(UserProfileDto profile, List<RewriteItem> rewrites) {
        List<String> selectedEducations = new ArrayList<>();
        if (rewrites == null || rewrites.isEmpty()) return selectedEducations;

        Set<String> selectedEduIds = new HashSet<>();
        for (RewriteItem item : rewrites) {
            if ("education".equals(item.getType())) {
                selectedEduIds.add(item.getOriginalId());
            }
        }

        if (profile.getEducations() != null) {
            for (EducationDto edu : profile.getEducations()) {
                if (selectedEduIds.contains(edu.getId())) {
                    selectedEducations.add(edu.getDegree() + " - " + edu.getSchool());
                }
            }
        }
        return selectedEducations;
    }
}