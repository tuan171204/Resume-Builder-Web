import { useState, useEffect } from 'react';
import { Mail, Edit, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation, useNavigate
import { toast } from 'sonner';
import { getMyInfo, updateMyInfo } from '../../services/userService'; // Import services
import { logOut } from '../../services/authenticationService'; // Import logOut

export function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMandatory = location.state?.mandatory || false; // Lấy trạng thái bắt buộc từ navigation

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        const user = response.data.result;
        console.log(user)
        setUserInfo(user);

        // Điền dữ liệu vào form
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setPhoneNumber(user.phoneNumber || '');
        setDob(user.dob || ''); // dob giả định là string date
        setEmail(user.email || 'Chưa khai báo email')
      } catch (error) {
        toast.error("Lỗi tải hồ sơ. Vui lòng đăng nhập lại.");
        logOut();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleSaveProfile = async () => {
    const isProfileComplete = firstName && lastName && phoneNumber && dob;

    if (isMandatory && !isProfileComplete) {
      toast.error("Bạn phải hoàn thiện Tên, Số điện thoại và Ngày sinh.");
      return;
    }

    try {
      const updateRequest = {
        firstName,
        lastName,
        phoneNumber,
        dob,
        password
      };

      await updateMyInfo(updateRequest);
      toast.success("Cập nhật hồ sơ thành công!");
      setIsEditOpen(false);

      if (isMandatory) {
        navigate('/dashboard');
      } else {
        // Tải lại dữ liệu sau khi cập nhật
        const response = await getMyInfo();
        setUserInfo(response.data.result);
      }

    } catch (error) {
      toast.error("Lỗi cập nhật hồ sơ. Vui lòng kiểm tra dữ liệu.");
    }
  };

  if (loading || !userInfo) return <div className="text-center py-20">Đang tải hồ sơ...</div>;

  if (isMandatory) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-lg shadow-xl border-t-4 border-t-[#6366F1]">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6366F1]/10">
              <Edit className="h-6 w-6 text-[#6366F1]" />
            </div>
            <CardTitle className="text-2xl text-[#1E293B]">Hoàn thiện hồ sơ</CardTitle>
            <CardDescription>
              Vui lòng cập nhật các thông tin cơ bản bên dưới để tiếp tục truy cập vào hệ thống.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <AlertDescription className="text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>Các trường thông tin này là bắt buộc.</span>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mandatory-firstName">Tên <span className="text-red-500">*</span></Label>
                <Input id="mandatory-firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Tên" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mandatory-lastName">Họ <span className="text-red-500">*</span></Label>
                <Input id="mandatory-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Họ" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mandatory-phone">Số điện thoại <span className="text-red-500">*</span></Label>
              <Input id="mandatory-phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="09xxxxxxxx" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mandatory-dob">Ngày sinh <span className="text-red-500">*</span></Label>
              <Input id="mandatory-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>

            <Separator />

            {/* <div className="space-y-2">
              <Label htmlFor="edit-new-password">Mật khẩu mới (Tùy chọn)</Label>
              <Input
                id="edit-new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Để trống nếu không đổi"
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="edit-current-password">Xác nhận mật khẩu hiện tại <span className="text-red-500">*</span></Label>
              <Input
                id="edit-current-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu để xác nhận"
              />
            </div>

            <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] h-11 text-base">
              Cập nhật & Truy cập Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dữ liệu dùng cho hiển thị trên trang Profile
  const userDisplay = userInfo;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="rounded-xl shadow-sm border-gray-200">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* ... Avatar và Profile Info giữ nguyên ... */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-2xl text-[#1E293B]">{userDisplay.firstName}  {userDisplay.lastName}</h1>
                <Badge className="w-fit mx-auto md:mx-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                  Thành viên phổ thông
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  <span>{userDisplay.email == '' ? 'Chưa khai báo email' : userDisplay.email}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4" />
                  <span>{userDisplay.dob}</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Users className="w-4 h-4" />
                  <span>{userDisplay.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Edit Button / Dialog Trigger */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] gap-2">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
                  <DialogDescription>Cập nhật thông tin cá nhân của bạn</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Re-use các input fields tương tự form trên nhưng cho Dialog */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tên</Label>
                      <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Họ</Label>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày sinh</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <Label>Mật khẩu hiện tại (Để lưu thay đổi)</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
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
            {/* <p className="text-3xl text-[#6366F1]">8</p> */}
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription>Bài viết diễn đàn</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p className="text-3xl text-[#8B5CF6]">24</p> */}
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription>Kết nối</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p className="text-3xl text-[#6366F1]">142</p> */}
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
          {/* <div className="space-y-4">
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
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
