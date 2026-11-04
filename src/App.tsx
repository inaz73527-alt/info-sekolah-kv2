import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AccessDenied } from './components/AccessDenied';

const MainApp: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
  // Hash-based route tracking to test URL manipulation prevention
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash.replace('#', '') || '';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync hash when role changes
  useEffect(() => {
    if (!isAuthenticated) {
      if (window.location.hash !== '#login') {
        window.location.hash = 'login';
      }
    } else if (isAdmin) {
      if (window.location.hash !== '#admin' && window.location.hash !== '#siswa') {
        window.location.hash = 'admin';
      }
    } else {
      if (window.location.hash !== '#siswa' && window.location.hash !== '#admin') {
        window.location.hash = 'siswa';
      }
    }
  }, [isAuthenticated, isAdmin]);

  const handleLoginSuccess = (role: 'admin' | 'siswa') => {
    if (role === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = 'siswa';
    }
  };

  // 1. If not authenticated, render Login Page
  if (!isAuthenticated || !user) {
    return <LoginPage onSuccessLogin={handleLoginSuccess} />;
  }

  // 2. Strict Role Check: Student attempting to access Admin Dashboard
  if (currentRoute === 'admin' || currentRoute.startsWith('admin/')) {
    if (!isAdmin) {
      // SECURITY GUARD TRIGGERED: Student attempting to open admin page directly
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
          <AccessDenied
            onBackToStudent={() => {
              window.location.hash = 'siswa';
            }}
            onSwitchToLogin={() => {
              logout();
              window.location.hash = 'login';
            }}
          />
        </div>
      );
    }
    return (
      <AdminDashboard
        onBackToStudent={() => {
          window.location.hash = 'siswa';
        }}
        onSwitchToLogin={() => {
          logout();
          window.location.hash = 'login';
        }}
      />
    );
  }

  // 3. Admin user visiting student view
  if (isAdmin && currentRoute === 'siswa') {
    return (
      <StudentDashboard
        isAdminPreview={true}
        onBackToAdmin={() => {
          window.location.hash = 'admin';
        }}
      />
    );
  }

  // 4. Admin user is directed to Admin Dashboard by default
  if (isAdmin) {
    return (
      <AdminDashboard
        onBackToStudent={() => {
          window.location.hash = 'siswa';
        }}
        onSwitchToLogin={() => {
          logout();
          window.location.hash = 'login';
        }}
      />
    );
  }

  // 5. Student user is directed to Student Dashboard
  return <StudentDashboard />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
