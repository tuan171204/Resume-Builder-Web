import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Mail, Lock, User, Chrome, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertDescription } from '../ui/alert';

export function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'recruiter'>('user');
  const [showAISuggestion, setShowAISuggestion] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.length > 3) {
      setShowAISuggestion(true);
    } else {
      setShowAISuggestion(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-[#1E293B] tracking-tight">ResumeForge</span>
          </div>
        </div>

        <Card className="rounded-xl shadow-lg border-0">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-[#1E293B]">Tạo tài khoản</CardTitle>
            <CardDescription>Tham gia ResumeForge để xây dựng CV chuyên nghiệp</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Tên người dùng</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="nguyenvana"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                
                {/* AI Username Suggestion */}
                {showAISuggestion && (
                  <Alert className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border-[#6366F1]/30">
                    <Sparkles className="w-4 h-4 text-[#6366F1]" />
                    <AlertDescription className="text-sm">
                      <span className="text-[#6366F1]">Gợi ý AI:</span> Thử "nguyenvana_pro" hoặc "nguyen.van.a.dev" để có tên người dùng chuyên nghiệp hơn
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nguyen.van.a@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label>Tôi là</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as 'user' | 'recruiter')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="cursor-pointer">
                      Người tìm việc / Người dùng
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="recruiter" />
                    <Label htmlFor="recruiter" className="cursor-pointer">
                      Nhà tuyển dụng / Công ty
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90">
                Tạo tài khoản
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Hoặc tiếp tục với</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button type="button" variant="outline" className="w-full gap-2">
                <Chrome className="w-5 h-5" />
                Đăng ký bằng Google
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-[#6366F1] hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
