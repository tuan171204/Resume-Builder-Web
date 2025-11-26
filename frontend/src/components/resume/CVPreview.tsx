import { Separator } from '../ui/separator';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export interface PreviewData {
  fullName: string;
  email: string;
  phone?: string;
  headline: string;
  skills: string[];
  languages: string[];
  experiences: Array<{
    id: string;
    position: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies?: string[];
  }>;
  educations: Array<{
    id: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
}

interface CVPreviewProps {
  data: PreviewData;
}

export function CVPreview({ data }: CVPreviewProps) {
  // Destructuring dữ liệu
  const {
    fullName, email, phone, headline,
    experiences, projects, educations, skills, languages
  } = data;

  return (
    <div className="bg-white text-gray-800 h-full min-h-[29.7cm] shadow-2xl p-10 md:p-14 font-sans leading-relaxed">
      {/* 1. HEADER INFO */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-3 uppercase tracking-tight">
          {fullName || 'Tên Ứng Viên'}
        </h1>
        {/* Nếu response có jobDescription hoặc vị trí mong muốn, có thể thêm vào đây. Tạm thời để trống hoặc lấy từ headline ngắn gọn */}

        <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-600 mt-4">
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#6366F1]" />
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2">
              <span>•</span>
              <Phone className="w-5 h-5 text-[#6366F1]" />
              <span>{phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span>•</span>
            <MapPin className="w-5 h-5 text-[#6366F1]" />
            <span>Vietnam</span>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY / HEADLINE */}
      {headline && (
        <div className="mb-6">
          {/* <h2 className="text-2xl font-bold text-[#6366F1] mb-4 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
            Tóm tắt chuyên môn
          </h2> */}
          <p className="text-3xl font-bold leading-loose text-gray-700 text-center">
            {headline}
          </p>
        </div>
      )}

      {/* 3. EXPERIENCE */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#6366F1] mb-6 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
            Kinh nghiệm làm việc
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-[#1E293B]">{exp.position}</h3>
                  <span className="text-base font-medium text-gray-500 whitespace-nowrap bg-gray-100 px-4 py-1 rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-lg font-bold text-[#6366F1] mb-3">{exp.company}</p>
                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line pl-4 border-l-4 border-gray-200">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROJECTS */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#6366F1] mb-6 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
            Dự án nổi bật
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#1E293B]">{proj.name}</h3>
                  <span className="text-sm text-gray-500 italic">
                    {proj.startDate} - {proj.endDate}
                  </span>
                </div>
                <p className="text-lg text-gray-700 mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. EDUCATION */}
      {educations.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#6366F1] mb-5 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
            Học vấn
          </h2>
          {educations.map((edu, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between mb-6 pb-4 border-b border-dashed border-gray-200 last:border-0">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">{edu.schoolName}</h3>
                <p className="text-lg text-gray-700 mt-1">
                  <span className="font-semibold">{edu.degree}</span> - {edu.fieldOfStudy}
                </p>
                {edu.description && <p className="text-gray-500 mt-1 italic">{edu.description}</p>}
              </div>
              <p className="text-lg text-gray-500 font-medium whitespace-nowrap mt-2 md:mt-0">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 6. SKILLS & LANGUAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#6366F1] mb-4 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
              Kỹ năng
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-[#6366F1]/10 text-[#6366F1] font-bold rounded-lg text-base">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#6366F1] mb-4 uppercase tracking-wide border-b-2 border-[#6366F1]/20 pb-2 inline-block">
              Ngôn ngữ
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, idx) => (
                <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg text-base border border-gray-200">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}