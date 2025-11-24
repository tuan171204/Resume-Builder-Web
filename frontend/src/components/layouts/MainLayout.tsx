import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, FileText, MessageSquare, LayoutTemplate, User, Home, LogOut, Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { getMyInfo } from '../../services/userService';
import { toast } from 'sonner';
import { logOut } from '../../services/authenticationService';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [username, setUsername] = useState('');
  const notificationCount = 3;

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    navigate('/login');
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const user = response.data?.result;

      if (user) {
        setUserInfo(user);
        setUsername(user.username || user.email || 'User');
      }

    } catch (error) {
      toast.error("Lỗi tải hồ sơ. Vui lòng đăng nhập lại.");
      // logOut();
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#1E293B] tracking-tight">ResumeForge</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/dashboard">
              <Button
                variant={isActive('/dashboard') || isActive('/cv') ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Trang chủ
              </Button>
            </Link>
            <Link to="/forum">
              <Button
                variant={isActive('/forum') ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Diễn đàn
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                variant={isActive('/templates') ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <LayoutTemplate className="w-4 h-4" />
                Mẫu CV
              </Button>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#6366F1] text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2">
                  <p className="text-sm text-[#1E293B]">Thông báo</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Yêu cầu kết bạn mới từ Sarah</p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">CV của bạn đã sẵn sàng để tải xuống</p>
                    <p className="text-xs text-gray-500">5 giờ trước</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">John đã bình luận bài viết của bạn</p>
                    <p className="text-xs text-gray-500">1 ngày trước</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">
                    {username}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Hồ sơ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/connections')}>
                  <User className="w-4 h-4 mr-2" />
                  Kết nối của tôi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/exports')}>
                  <Download className="w-4 h-4 mr-2" />
                  Lịch sử xuất file
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-600">Được hỗ trợ bởi ResumeForge AI</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-[#6366F1] transition-colors">Điều khoản</a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">Quyền riêng tư</a>
              <a href="#" className="hover:text-[#6366F1] transition-colors">Liên hệ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 px-4">
            <Home className={`w-5 h-5 ${isActive('/dashboard') ? 'text-[#6366F1]' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive('/dashboard') ? 'text-[#6366F1]' : 'text-gray-500'}`}>
              Trang chủ
            </span>
          </Link>
          <Link to="/cv/new" className="flex flex-col items-center gap-1 px-4">
            <FileText className={`w-5 h-5 ${isActive('/cv') ? 'text-[#6366F1]' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive('/cv') ? 'text-[#6366F1]' : 'text-gray-500'}`}>
              CV
            </span>
          </Link>
          <Link to="/forum" className="flex flex-col items-center gap-1 px-4">
            <MessageSquare className={`w-5 h-5 ${isActive('/forum') ? 'text-[#6366F1]' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive('/forum') ? 'text-[#6366F1]' : 'text-gray-500'}`}>
              Diễn đàn
            </span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4">
            <User className={`w-5 h-5 ${isActive('/profile') ? 'text-[#6366F1]' : 'text-gray-500'}`} />
            <span className={`text-xs ${isActive('/profile') ? 'text-[#6366F1]' : 'text-gray-500'}`}>
              Hồ sơ
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
