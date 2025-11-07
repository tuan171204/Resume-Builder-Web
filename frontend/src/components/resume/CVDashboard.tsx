import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Pencil, Trash2, Download, Eye, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { toast } from 'sonner';

interface CV {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'draft' | 'published';
  template: string;
}

export function CVDashboard() {
  const navigate = useNavigate();
  const [cvs, setCvs] = useState<CV[]>([
    {
      id: '1',
      title: 'CV Lập trình viên Senior',
      lastUpdated: '2 giờ trước',
      status: 'published',
      template: 'Hiện đại'
    },
    {
      id: '2',
      title: 'Portfolio Full Stack',
      lastUpdated: '1 ngày trước',
      status: 'draft',
      template: 'Chuyên nghiệp'
    },
    {
      id: '3',
      title: 'CV Quản lý Sản phẩm',
      lastUpdated: '3 ngày trước',
      status: 'published',
      template: 'Tối giản'
    },
    {
      id: '4',
      title: 'CV Trưởng nhóm Kỹ thuật',
      lastUpdated: '1 tuần trước',
      status: 'draft',
      template: 'Hiện đại'
    }
  ]);

  const handleDelete = (id: string) => {
    setCvs(cvs.filter(cv => cv.id !== id));
    toast.success('Đã xóa CV thành công');
  };

  const handleExport = (title: string) => {
    toast.success(`Đang xuất "${title}" ra PDF...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-[#1E293B] mb-2">CV của tôi</h1>
          <p className="text-gray-600">Quản lý và tạo CV chuyên nghiệp của bạn</p>
        </div>
        <Button 
          onClick={() => navigate('/cv/new')}
          className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
        >
          <Plus className="w-5 h-5" />
          Tạo CV mới
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tổng số CV</p>
                <p className="text-2xl text-[#1E293B]">{cvs.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#6366F1]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Đã xuất bản</p>
                <p className="text-2xl text-[#1E293B]">
                  {cvs.filter(cv => cv.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bản nháp</p>
                <p className="text-2xl text-[#1E293B]">
                  {cvs.filter(cv => cv.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mẫu CV</p>
                <p className="text-2xl text-[#1E293B]">12</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CV List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cvs.map((cv) => (
          <Card key={cv.id} className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-[#1E293B] mb-2">{cv.title}</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant={cv.status === 'published' ? 'default' : 'secondary'}
                      className={cv.status === 'published' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                      }
                    >
                      {cv.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </Badge>
                    <Badge variant="outline">{cv.template}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Cập nhật {cv.lastUpdated}
              </CardDescription>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/cv/edit/${cv.id}`)}
                  className="gap-2 flex-1"
                >
                  <Pencil className="w-4 h-4" />
                  Chỉnh sửa
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/cv/preview/${cv.id}`)}
                  className="gap-2 flex-1"
                >
                  <Eye className="w-4 h-4" />
                  Xem trước
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExport(cv.title)}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xóa CV</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa "{cv.title}"? Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(cv.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {cvs.length === 0 && (
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-[#1E293B] mb-2">Chưa có CV nào</h3>
            <p className="text-gray-600 mb-4">Bắt đầu bằng cách tạo CV đầu tiên của bạn</p>
            <Button 
              onClick={() => navigate('/cv/new')}
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2"
            >
              <Plus className="w-5 h-5" />
              Tạo CV mới
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
