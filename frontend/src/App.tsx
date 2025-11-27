import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ProfilePage } from './components/auth/ProfilePage';
import { CVDashboard } from './components/resume/CVDashboard';
import { CVEditor } from './components/resume/CVEditor';
import { TemplateSelection } from './components/resume/TemplateSelection';
// import { CVPreview } from './components/resume/CVPreview';
import { ForumHome } from './components/forum/ForumHome';
import { PostDetail } from './components/forum/PostDetail';
import { ConnectionsPage } from './components/forum/ConnectionsPage';
import { ExportHistory } from './components/export/ExportHistory';
import { Toaster } from './components/ui/sonner';
import { isAuthenticated as checkAuthStatus } from './services/authenticationService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());

  const handleLogin = () => {
    setIsAuthenticated(checkAuthStatus());
  }

  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<CVDashboard />} />
            <Route path="/cv/new" element={<CVEditor />} />
            <Route path="/cv/edit/:id" element={<CVEditor />} />
            <Route path="/templates" element={<TemplateSelection />} />
            <Route path="/forum" element={<ForumHome />} />
            <Route path="/forum/post/:id" element={<PostDetail />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exports" element={<ExportHistory />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}
