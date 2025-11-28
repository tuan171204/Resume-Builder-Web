import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, LayoutTemplate, User, Home, LogOut, Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
// import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import httpClient from '../../configurations/httpClient';
import { getMyInfo } from '../../services/userService';
import { toast } from 'sonner';
import { logOut } from '../../services/authenticationService';
import { getToken } from '../../services/localStorageService';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showUpgradePanel, setShowUpgradePanel] = useState(true);
  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<any>(null);
  const [orderCode, setOrderCode] = useState<number | null>(null);
  const [paymentPaid, setPaymentPaid] = useState(false);
  // const notificationCount = 3;

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const user = response.data?.result;

      if (user) {
        setUsername(user.username || user.email || 'User');
        if (user?.accountType === 'PRO') {
          setShowUpgradePanel(false);
        }
      }

      return user;

    } catch (error) {
      toast.error("Lỗi tải hồ sơ. Vui lòng đăng nhập lại.");
      // logOut();
      return null;
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
            {/* <Link to="/forum">
              <Button
                variant={isActive('/forum') ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Diễn đàn
              </Button>
            </Link> */}
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
            {/* Upgrade to Pro button (left of notifications) */}
            {showUpgradePanel && (
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative" onClick={() => setShowUpgradePanel(v => !v)}>
                  {/* Use a simple crown icon? Fallback to User icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25l1.8-3.6L17.4 8.25 21 6l-2.4 4.2L21 15l-4.2-1.8L12 19l-4.8-5.8L3 15l2.4-4.8L3 6l3.6 2.25L12 8.25z" />
                  </svg>
                </Button>

                {showUpgradePanel && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow p-3">
                    <div className="font-medium mb-2">Nâng cấp tài khoản lên PRO</div>
                    <div className="text-sm text-gray-600 mb-2">Thanh toán: 2.000 VNĐ — Nội dung: nâng cấp tài khoản Pro</div>
                    <div className="flex gap-2">
                      <Button
                        onClick={async () => {
                          setIsUpgradeLoading(true);
                          setUpgradeResult(null);
                          setPaymentPaid(false);
                          try {
                            const payload = { amount: 2000, description: 'nâng cấp tài khoản Pro' };
                            const res = await httpClient.post('/api/payments/create', payload);
                            setUpgradeResult(res.data);
                            // Lưu orderCode từ response
                            const code = res.data?.data?.data?.orderCode;
                            if (code) setOrderCode(code);
                            toast.success('Tạo yêu cầu thanh toán thành công');
                          } catch (err) {
                            toast.error('Tạo yêu cầu thất bại. Kiểm tra console');
                            console.error(err);
                          } finally {
                            setIsUpgradeLoading(false);
                          }
                        }}
                        disabled={isUpgradeLoading}
                      >
                        {isUpgradeLoading ? 'Đang tạo...' : 'Tạo giao dịch'}
                      </Button>
                      {orderCode && (
                        <Button variant="outline" onClick={async () => {
                          try {
                            const res = await httpClient.get(`/api/payments/check/${orderCode}`);
                            const status = res.data?.data?.data?.status;
                            if (status === 'PAID') {
                              setPaymentPaid(true);
                              toast.success('Đã thanh toán thành công! Nhấn nút Nâng cấp ngay.');
                            } else {
                              toast('Chưa thanh toán. Trạng thái: ' + (status || 'PENDING'));
                            }
                          } catch (err) {
                            toast.error('Kiểm tra thất bại');
                            console.error(err);
                          }
                        }}>Kiểm tra trạng thái</Button>
                      )}
                    </div>

                    {upgradeResult && (
                      <div className="mt-3">
                        {upgradeResult?.data?.data?.checkoutUrl && (
                          <div className="mt-2 flex gap-2">
                            <a href={upgradeResult.data.data.checkoutUrl} target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#6366F1] text-white rounded text-sm">Mở checkout</a>
                            <button className="px-3 py-2 border rounded text-sm" onClick={() => navigator.clipboard?.writeText(upgradeResult.data.data.checkoutUrl)}>Sao chép</button>
                          </div>
                        )}
                        {upgradeResult?.data?.data?.qrCode && (
                          <div className="mt-3 flex flex-col items-center gap-3">
                            <img src={upgradeResult.data.data.qrCode.startsWith('data:') || upgradeResult.data.data.qrCode.startsWith('http') ? upgradeResult.data.data.qrCode : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upgradeResult.data.data.qrCode)}`} alt="qr" className="w-48 h-48 object-contain bg-white p-2 rounded border" />
                            {paymentPaid && (
                              <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={async () => {
                                try {
                                  await httpClient.post('/identity/users/myInfo/upgrade', {}, {
                                    headers: {
                                      Authorization: `Bearer ${getToken()}`,
                                    }
                                  });
                                  toast.success('Nâng cấp thành công!');
                                  await fetchUserInfo();
                                  setShowUpgradePanel(false);
                                  setPaymentPaid(false);
                                  setOrderCode(null);
                                } catch (err) {
                                  toast.error('Nâng cấp thất bại');
                                  console.error(err);
                                }
                              }}>Nâng cấp ngay</Button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#6366F1] text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button> */}
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent align="end" className="w-80">
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
              </DropdownMenuContent> */}
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
      </header >

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8" >
        <Outlet />
      </main >

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16" >
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
      </footer >

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" >
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
      </div >
    </div >
  );
}
