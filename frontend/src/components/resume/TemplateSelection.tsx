import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Eye, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Template {
  id: string;
  name: string;
  category: 'modern' | 'minimalist' | 'professional';
  preview: string;
  popular?: boolean;
}

export function TemplateSelection() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const templates: Template[] = [
    { id: '1', name: 'Hiện đại Pro', category: 'modern', preview: '#6366F1', popular: true },
    { id: '2', name: 'Sạch sẽ', category: 'minimalist', preview: '#1E293B', popular: true },
    { id: '3', name: 'Điều hành', category: 'professional', preview: '#8B5CF6', popular: false },
    { id: '4', name: 'Công nghệ', category: 'modern', preview: '#3B82F6', popular: false },
    { id: '5', name: 'Đường nét đơn giản', category: 'minimalist', preview: '#64748B', popular: true },
    { id: '6', name: 'Doanh nghiệp', category: 'professional', preview: '#475569', popular: false },
    { id: '7', name: 'Sáng tạo', category: 'modern', preview: '#A855F7', popular: false },
    { id: '8', name: 'Tối giản Tối', category: 'minimalist', preview: '#0F172A', popular: false },
    { id: '9', name: 'Doanh nhân', category: 'professional', preview: '#334155', popular: true },
  ];

  const [activeTab, setActiveTab] = useState('all');

  const filteredTemplates = activeTab === 'all'
    ? templates
    : templates.filter(t => t.category === activeTab);

  const handleUseTemplate = (templateId: string) => {
    navigate('/cv/new');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#1E293B] mb-2">Mẫu CV</h1>
        <p className="text-gray-600">Chọn mẫu chuyên nghiệp để bắt đầu</p>
      </div>

      {/* Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:inline-grid">
          <TabsTrigger value="all">Tất cả mẫu</TabsTrigger>
          <TabsTrigger value="modern">Hiện đại</TabsTrigger>
          <TabsTrigger value="minimalist">Tối giản</TabsTrigger>
          <TabsTrigger value="professional">Chuyên nghiệp</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-all cursor-pointer ${selectedTemplate === template.id ? 'ring-2 ring-[#6366F1]' : ''
                  }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="capitalize text-xs">
                          {template.category === 'modern' ? 'Hiện đại' :
                            template.category === 'minimalist' ? 'Tối giản' : 'Chuyên nghiệp'}
                        </Badge>
                        {template.popular && (
                          <Badge className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-xs">
                            Phổ biến
                          </Badge>
                        )}
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Template Preview */}
                  <div
                    className="w-full aspect-[8.5/11] rounded-lg mb-4 p-4"
                    style={{ backgroundColor: template.preview }}
                  >
                    <div className="bg-white/10 rounded h-3 w-3/4 mb-3" />
                    <div className="bg-white/10 rounded h-2 w-1/2 mb-6" />
                    <div className="space-y-2">
                      <div className="bg-white/20 rounded h-2 w-full" />
                      <div className="bg-white/20 rounded h-2 w-5/6" />
                      <div className="bg-white/20 rounded h-2 w-4/6" />
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="bg-white/20 rounded h-2 w-2/3" />
                      <div className="bg-white/20 rounded h-2 w-3/4" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Preview functionality
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      Xem trước
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template.id);
                      }}
                    >
                      <FileText className="w-4 h-4" />
                      Sử dụng mẫu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-[#1E293B] mb-2">Không tìm thấy mẫu</h3>
            <p className="text-gray-600">Thử chọn danh mục khác</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
