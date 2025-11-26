export interface SelectedExperience {
    originalExperienceId: string;
    overriddenDescription?: string;
    displayOrder: number;
}


export interface Experience {
    id: string;
    position: string;
    companyName: string; // Đổi company -> companyName cho khớp backend
    startDate: string;
    endDate: string;
    description: string;
    isCurrent?: boolean; // Tùy chọn: Đang làm việc tại đây
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
}

export interface Education {
    id: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Language {
    id: string;
    language: string;
    level: string;
}

export interface ResumeResponse {
    id: string; // Backend trả về id string
    userId: string;
    fullName: string;
    email: string;
    headline: string;
    jobDescription: string;
    matchScore: number;

    // Các trường dữ liệu chi tiết
    selectedExperiences: SelectedExperience[];
    selectedProjects: Project[];
    selectedEducations: Education[];
    selectedSkills: string[];
    suggestedSkills: string[];
    languages: string[];

    createdAt: string;
    updatedAt: string;
}

export interface GenerateResumeRequest {
    userId: string;
    jobDescription: string;
}