import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FileUp, Sparkles, Briefcase, GraduationCap, FolderGit,
  Languages, User, Eye, EyeOff, MonitorPlay, X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';

// --- Services (Giả định path file service của bạn) ---
import { generateResume } from '../../services/resumeService';
import { getUserProfile } from '../../services/userService';

// --- Types ---
import type { PreviewData } from './CVPreview';
import { CVPreview } from './CVPreview';
import { ExperienceSection } from '../cv-sections/ExperienceSection';
import { ProjectSection } from '../cv-sections/ProjectSection';
import { EducationSection } from '../cv-sections/EducationSection';
import { LanguageSection } from '../cv-sections/LanguageSection';
import type { Experience, Project, Education, Language } from '../../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface OriginalExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

interface OriginalUserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  experiences: OriginalExperience[];
  // Các trường khác nếu cần...
}

interface AIResponse {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  headline: string;
  matchScore: number;
  selectedSkills: string[];
  suggestedSkills: string[];
  languages: string[];
  // AI chỉ trả về ID và Description mới
  selectedExperiences: Array<{
    originalExperienceId: string;
    overriddenDescription: string;
    displayOrder: number;
  }>;
  // Project & Education AI trả về full (theo mẫu JSON bạn đưa)
  selectedProjects: Array<{
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
  }>;
  selectedEducations: Array<{
    id: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
}


export function CVEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATE DỮ LIỆU GỐC ---
  const [originalProfile, setOriginalProfile] = useState<OriginalUserProfile | null>(null);


  // --- STATE DỮ LIỆU EDITING ---
  const [cvTitle, setCvTitle] = useState(id ? 'CV Ứng tuyển' : 'CV Mới');
  const [jobDescription, setJobDescription] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);

  // Các trường dữ liệu CV (Flat state để dễ edit)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [headline, setHeadline] = useState('');

  // Dữ liệu mảng (Mapped)
  const [skills, setSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  // --- CẬP NHẬT STATE TYPES ---
  // Sử dụng đúng Type mới định nghĩa
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  // Lưu ý: Languages nên đổi thành array object để lưu cả level
  const [languages, setLanguages] = useState<Language[]>([]);

  // State UI
  const [selectedSection, setSelectedSection] = useState<string>('jd');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    // Dùng 'content' thay vì 'contentRef' để tương thích tốt hơn với các phiên bản
    contentRef: printRef,
    documentTitle: `CV_${fullName || 'Candidate'}`,
    // Thiết lập CSS in ấn trực tiếp tại đây để tránh xung đột bên ngoài
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        /* Đảm bảo nội dung luôn hiển thị */
        html, body {
          height: 100%;
          overflow: visible !important;
        }
      }
    `,
    onAfterPrint: () => toast.success("Đã xuất file PDF thành công!"),
  });

  const sections = [
    { id: 'jd', title: 'JD & AI Phân Tích', icon: Sparkles },
    { id: 'summary', title: 'Tiêu đề & Tóm tắt', icon: User },
    { id: 'experience', title: 'Kinh nghiệm', icon: Briefcase },
    { id: 'projects', title: 'Dự án', icon: FolderGit },
    { id: 'education', title: 'Học vấn', icon: GraduationCap },
    { id: 'skills', title: 'Kỹ năng', icon: MonitorPlay },
    { id: 'languages', title: 'Ngôn ngữ', icon: Languages },
  ];

  // 1. Lấy thông tin User Profile gốc khi load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profileRes = await getUserProfile();
        const profileData = profileRes.data as OriginalUserProfile; // Ép kiểu về OriginalUserProfile

        setOriginalProfile(profileData);

        // Điền thông tin cơ bản mặc định
        setFullName(`${profileData.firstName} ${profileData.lastName}`);
        setEmail(profileData.email);
        setPhone(profileData.phoneNumber);
      }
      catch (e) {
        console.error(e);
        toast.error("Không thể lấy dữ liệu người dùng");
      }
    }
    fetchUser();
  }, []);

  // 2. Xử lý AI Generate
  const handleGenerateAI = async () => {
    if (!jobDescription.trim()) return toast.error('Vui lòng nhập JD');
    if (!originalProfile) return toast.error('Dữ liệu gốc chưa tải xong, vui lòng đợi...');

    setIsGenerating(true);
    try {
      const rawResponse = await generateResume({
        userId: originalProfile.userId, // Hoặc originalProfile.id tùy cấu trúc
        jobDescription: jobDescription
      });

      const response = rawResponse as unknown as AIResponse;

      // 1. Map thông tin chung
      setMatchScore(response.matchScore);
      setFullName(response.fullName || fullName);
      setHeadline(response.headline);
      setSkills(response.selectedSkills || []);
      setSuggestedSkills(response.suggestedSkills || []);
      setLanguages((response.languages || []).map(lang => ({
        id: uuidv4(), // Tạo ID tạm vì string mảng không có ID
        language: lang,
        level: '' // AI JSON hiện tại chưa trả về level, để trống hoặc mặc định
      })));

      // 2. Map EXPERIENCE (Cần merge với Original vì AI chỉ trả về ID + Description mới)
      if (response.selectedExperiences && originalProfile.experiences) {
        const mappedExps = response.selectedExperiences.map((aiExp) => {
          // Tìm experience gốc để lấy các thông tin AI không trả về (Company, Date...)
          const origin = originalProfile.experiences.find(
            (e) => e.id === aiExp.originalExperienceId
          );

          if (!origin) return null;

          return {
            id: origin.id,
            position: origin.position,
            companyName: origin.companyName,
            startDate: origin.startDate,
            endDate: origin.endDate || '',
            // Ưu tiên dùng mô tả đã được AI viết lại, nếu không có thì dùng gốc
            description: aiExp.overriddenDescription || origin.description
          };
        }).filter(Boolean) as Experience[];

        setExperiences(mappedExps);
      }

      // 3. Map PROJECTS (Lấy trực tiếp từ AI Response)
      if (response.selectedProjects) {
        const mappedProjects = response.selectedProjects.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          startDate: p.startDate,
          endDate: p.endDate,
          technologies: p.technologies || []
        }));
        setProjects(mappedProjects);
      }

      // 4. Map EDUCATION (Lấy trực tiếp từ AI Response)
      if (response.selectedEducations) {
        const mappedEducations = response.selectedEducations.map(e => ({
          id: e.id,
          schoolName: e.schoolName,
          degree: e.degree,
          fieldOfStudy: e.fieldOfStudy,
          startDate: e.startDate,
          endDate: e.endDate,
          description: e.description || ''
        }));
        setEducations(mappedEducations);
      }

      toast.success(`Đã tối ưu CV! Độ phù hợp: ${response.matchScore}%`);
      setSelectedSection('summary');

    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tạo CV. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Chuẩn bị dữ liệu cho Preview Component
  const previewData: PreviewData = {
    fullName, email, phone, headline, skills,
    // Map languages object về string để hiển thị đơn giản (hoặc sửa CVPreview để hiện level đẹp hơn)
    languages: languages.map(l => `${l.language} - ${l.level}`),

    experiences: experiences.map(e => ({
      ...e,
      company: e.companyName, // Mapping lại tên trường nếu CVPreview dùng 'company'
      duration: `${e.startDate} - ${e.endDate || 'Hiện tại'}`
    })),

    projects: projects.map(p => ({ ...p })), // Project structure gần như giống nhau

    educations: educations.map(e => ({ ...e }))
  };

  // const handleSave = () => toast.success('Đã lưu bản nháp');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50/50">
      {/* HEADER */}
      <div className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="w-5 h-5 text-gray-500" />
          </Button>
          <Input
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            className="font-bold border-none shadow-none w-[200px]"
          />
          {matchScore !== null && (
            <Badge className={matchScore >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              Match: {matchScore}%
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="md:hidden" onClick={() => setShowPreviewMobile(!showPreviewMobile)}>
            {showPreviewMobile ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => handlePrint()}
            className="bg-[#6366F1] hover:bg-[#5558DD] gap-2"
          >
            <FileUp className="w-4 h-4" /> Xuất PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT EDITOR */}
        <div className={`flex-1 flex flex-col md:w-[45%] md:max-w-[600px] border-r bg-white ${showPreviewMobile ? 'hidden md:flex' : 'flex'}`}>

          {/* Navigation Tabs */}
          <div className="flex p-2 overflow-x-auto border-b no-scrollbar bg-gray-50 sticky top-0">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${selectedSection === sec.id ? 'bg-white text-[#6366F1] shadow ring-1 ring-[#6366F1]/20' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <sec.icon className="w-4 h-4" /> {sec.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* JD SECTION */}
            {selectedSection === 'jd' && (
              <div className="space-y-4">
                <Card className="bg-indigo-50 border-indigo-100">
                  <CardContent className="p-4 text-indigo-800 text-sm">
                    Dán mô tả công việc (JD) vào đây để AI phân tích và chọn lọc kinh nghiệm phù hợp nhất từ hồ sơ của bạn.
                  </CardContent>
                </Card>
                <Textarea
                  placeholder="Paste Job Description here..."
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <Button onClick={handleGenerateAI} disabled={isGenerating} className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                  {isGenerating ? 'Đang phân tích...' : '✨ Tối ưu hóa CV'}
                </Button>
              </div>
            )}

            {/* SUMMARY SECTION */}
            {selectedSection === 'summary' && (
              <div className="space-y-4">
                <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Họ tên" />
                <div className="grid grid-cols-2 gap-4">
                  <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Số điện thoại" />
                </div>
                <label className="text-sm font-bold block mt-2">Headline (Tóm tắt)</label>
                <Textarea value={headline} onChange={e => setHeadline(e.target.value)} className="min-h-[150px]" />
              </div>
            )}

            {selectedSection === 'experience' && (
              <ExperienceSection data={experiences} onChange={setExperiences} />
            )}

            {selectedSection === 'projects' && (
              <ProjectSection data={projects} onChange={setProjects} />
            )}

            {selectedSection === 'education' && (
              <EducationSection data={educations} onChange={setEducations} />
            )}

            {selectedSection === 'languages' && (
              <LanguageSection data={languages} onChange={setLanguages} />
            )}
            {/* SKILLS SECTION */}
            {selectedSection === 'skills' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle className="text-sm">Kỹ năng đã chọn</CardTitle></CardHeader>
                  <CardContent>
                    <Textarea
                      value={skills.join(', ')}
                      onChange={e => setSkills(e.target.value.split(',').map(s => s.trim()))}
                    />
                    <div className="flex gap-2 flex-wrap mt-2">
                      {skills.map((s, i) => <Badge key={i} className="bg-green-100 text-green-800">{s}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
                {suggestedSkills.length > 0 && (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader><CardTitle className="text-sm text-yellow-800">Gợi ý từ JD</CardTitle></CardHeader>
                    <CardContent className="flex gap-2 flex-wrap">
                      {suggestedSkills.map((s, i) => <Badge key={i} variant="outline" className="bg-white">{s}</Badge>)}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className={`flex-1 bg-gray-200/90 overflow-y-auto p-8 justify-center items-start ${showPreviewMobile ? 'flex fixed inset-0 z-50 pt-20' : 'hidden md:flex'}`}>
          {/* LƯU Ý: 
              1. Gắn ref={printRef} vào thẻ div bao ngoài CVPreview 
              2. Bỏ các class transform/scale ở div này để khi in nó Full Size chuẩn A4
              3. Style transform chỉ nên áp dụng cho việc "nhìn trên màn hình"
           */}
          <div className="w-full max-w-[210mm] min-h-[297mm]">
            <div ref={printRef}>
              <CVPreview data={previewData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}