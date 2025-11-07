import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, FileUp, Sparkles, Plus, GripVertical, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { AIAssistant } from '../ai/AIAssistant';
import { toast } from 'sonner';

interface Section {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'projects';
  title: string;
  content: any;
}

export function CVEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cvTitle, setCvTitle] = useState(id ? 'CV Lập trình viên Senior' : 'CV Chưa đặt tên');
  const [selectedSection, setSelectedSection] = useState<string>('summary');
  const [showAI, setShowAI] = useState(false);
  const [aiContext, setAIContext] = useState('');
  
  const [sections] = useState<Section[]>([
    { id: 'summary', type: 'summary', title: 'Tóm tắt chuyên môn', content: {} },
    { id: 'experience', type: 'experience', title: 'Kinh nghiệm làm việc', content: {} },
    { id: 'education', type: 'education', title: 'Học vấn', content: {} },
    { id: 'skills', type: 'skills', title: 'Kỹ năng', content: {} },
    { id: 'projects', type: 'projects', title: 'Dự án', content: {} }
  ]);

  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState([
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Lập trình viên Senior',
      duration: 'Tháng 1/2022 - Hiện tại',
      description: 'Dẫn dắt phát triển các ứng dụng web có khả năng mở rộng sử dụng React và Node.js'
    }
  ]);

  const handleSave = () => {
    toast.success('Đã lưu CV thành công');
  };

  const handlePublish = () => {
    toast.success('Đã xuất bản CV thành công');
  };

  const handlePreview = () => {
    navigate(`/cv/preview/${id || 'new'}`);
  };

  const handleAIGenerate = (sectionType: string) => {
    setAIContext(sectionType);
    setShowAI(true);
  };

  const handleAIAccept = (generatedText: string) => {
    if (aiContext === 'summary') {
      setSummary(generatedText);
    }
    setShowAI(false);
    toast.success('Đã áp dụng nội dung AI');
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: ''
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <Input
            value={cvTitle}
            onChange={(e) => setCvTitle(e.target.value)}
            className="text-2xl h-auto py-2 border-0 px-0 focus-visible:ring-0 text-[#1E293B]"
            placeholder="Tiêu đề CV"
          />
          <p className="text-gray-600 mt-1">Đã lưu 2 phút trước</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Lưu nháp
          </Button>
          <Button variant="outline" onClick={handlePreview} className="gap-2">
            <Eye className="w-4 h-4" />
            Xem trước
          </Button>
          <Button onClick={handlePublish} className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2">
            <FileUp className="w-4 h-4" />
            Xuất bản
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Sections */}
        <div className="lg:col-span-3">
          <Card className="rounded-xl shadow-sm border-gray-200 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Các phần</CardTitle>
              <CardDescription>Nhấp để chỉnh sửa từng phần</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedSection === section.id
                      ? 'bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 text-[#6366F1]'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <GripVertical className="w-4 h-4" />
                  {section.title}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Editor Panel */}
        <div className="lg:col-span-9 space-y-6">
          {/* Professional Summary */}
          {selectedSection === 'summary' && (
            <Card className="rounded-xl shadow-sm border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tóm tắt chuyên môn</CardTitle>
                    <CardDescription>Tổng quan ngắn gọn về nền tảng chuyên môn của bạn</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAIGenerate('summary')}
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Tạo bằng AI
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Viết tóm tắt ngắn gọn về kinh nghiệm và mục tiêu nghề nghiệp của bạn..."
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>
          )}

          {/* Work Experience */}
          {selectedSection === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl text-[#1E293B]">Kinh nghiệm làm việc</h2>
                  <p className="text-sm text-gray-600">Thêm lịch sử công việc của bạn</p>
                </div>
                <Button
                  variant="outline"
                  onClick={addExperience}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Thêm kinh nghiệm
                </Button>
              </div>

              {experiences.map((exp, index) => (
                <Card key={exp.id} className="rounded-xl shadow-sm border-gray-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">Kinh nghiệm {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Công ty</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => {
                            const updated = experiences.map(e =>
                              e.id === exp.id ? { ...e, company: e.target.value } : e
                            );
                            setExperiences(updated);
                          }}
                          placeholder="Tên công ty"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Vị trí</Label>
                        <Input
                          value={exp.position}
                          placeholder="Chức danh công việc"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Thời gian</Label>
                      <Input
                        value={exp.duration}
                        placeholder="Tháng 1/2022 - Hiện tại"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Mô tả</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAIGenerate('experience')}
                          className="gap-2 text-[#6366F1] hover:text-[#6366F1]"
                        >
                          <Sparkles className="w-4 h-4" />
                          Tạo bằng AI
                        </Button>
                      </div>
                      <Textarea
                        value={exp.description}
                        placeholder="Mô tả trách nhiệm và thành tích của bạn..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Education */}
          {selectedSection === 'education' && (
            <Card className="rounded-xl shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Học vấn</CardTitle>
                <CardDescription>Thêm nền tảng giáo dục của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Bằng cấp</Label>
                  <Input placeholder="Cử nhân Khoa học Máy tính" />
                </div>
                <div className="space-y-2">
                  <Label>Trường</Label>
                  <Input placeholder="Tên trường đại học" />
                </div>
                <div className="space-y-2">
                  <Label>Năm</Label>
                  <Input placeholder="2018 - 2022" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {selectedSection === 'skills' && (
            <Card className="rounded-xl shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Kỹ năng</CardTitle>
                <CardDescription>Liệt kê kỹ năng kỹ thuật và mềm của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Kỹ năng kỹ thuật</Label>
                  <Input placeholder="JavaScript, React, Node.js, Python..." />
                </div>
                <div className="space-y-2">
                  <Label>Kỹ năng mềm</Label>
                  <Input placeholder="Lãnh đạo, Giao tiếp, Giải quyết vấn đề..." />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {selectedSection === 'projects' && (
            <Card className="rounded-xl shadow-sm border-gray-200">
              <CardHeader>
                <CardTitle>Dự án</CardTitle>
                <CardDescription>Trình bày các dự án đáng chú ý của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên dự án</Label>
                  <Input placeholder="Nền tảng Thương mại điện tử" />
                </div>
                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Textarea placeholder="Mô tả dự án, vai trò của bạn và công nghệ sử dụng..." />
                </div>
                <div className="space-y-2">
                  <Label>Liên kết</Label>
                  <Input placeholder="https://github.com/username/project" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistant
          context={aiContext}
          onAccept={handleAIAccept}
          onClose={() => setShowAI(false)}
        />
      )}
    </div>
  );
}
