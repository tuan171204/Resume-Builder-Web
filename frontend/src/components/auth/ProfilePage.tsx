import { useState } from 'react';
import { Calendar, Mail, Users, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function ProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [username, setUsername] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyen.van.a@example.com');

  const handleSaveProfile = () => {
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>NVA</AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-2xl text-[#1E293B]">{username}</h1>
                <Badge className="w-fit mx-auto md:mx-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                  Thành viên Pro
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4" />
                  <span>Tham gia Tháng 10 năm 2024</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Users className="w-4 h-4" />
                  <span>142 Kết nối</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa hồ sơ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                  <DialogDescription>
                    Cập nhật thông tin hồ sơ của bạn
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-username">Tên người dùng</Label>
                    <Input
                      id="edit-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription>Tổng số CV</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#6366F1]">8</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription>Bài viết diễn đàn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#8B5CF6]">24</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription>Kết nối</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#6366F1]">142</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardHeader>
          <CardTitle>Hoạt động gần đây</CardTitle>
          <CardDescription>Các hành động mới nhất của bạn trên ResumeForge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#6366F1] mt-2" />
              <div className="flex-1">
                <p className="text-sm text-[#1E293B]">Đã tạo CV mới "CV Lập trình viên Senior"</p>
                <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2" />
              <div className="flex-1">
                <p className="text-sm text-[#1E293B]">Đã đăng bài trên diễn đàn: "Thực hành tốt nhất cho phỏng vấn kỹ thuật"</p>
                <p className="text-xs text-gray-500 mt-1">1 ngày trước</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#6366F1] mt-2" />
              <div className="flex-1">
                <p className="text-sm text-[#1E293B]">Đã kết nối với Sarah Johnson</p>
                <p className="text-xs text-gray-500 mt-1">2 ngày trước</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-2" />
              <div className="flex-1">
                <p className="text-sm text-[#1E293B]">Đã xuất CV ra PDF</p>
                <p className="text-xs text-gray-500 mt-1">3 ngày trước</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
