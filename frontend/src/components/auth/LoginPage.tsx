import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    // Redirect to dashboard after login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
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
            <CardTitle className="text-[#1E293B]">Chào mừng trở lại</CardTitle>
            <CardDescription>Đăng nhập vào tài khoản để tiếp tục</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-[#6366F1] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90">
                Đăng nhập
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

              {/* Google Sign In */}
              <Button type="button" variant="outline" className="w-full gap-2">
                <Chrome className="w-5 h-5" />
                Đăng nhập bằng Google
              </Button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-[#6366F1] hover:underline">
                  Đăng ký
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
