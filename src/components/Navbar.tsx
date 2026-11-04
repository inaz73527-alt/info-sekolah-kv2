import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  User as UserIcon,
  Bell,
  Calendar,
  Clock,
  Compass,
  Image as ImageIcon,
  FileText,
  Phone,
  LayoutDashboard,
  Users,
  Building2,
} from 'lucide-react';
import { SchoolContactInfo } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: 'admin' | 'siswa';
  schoolContact?: SchoolContactInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, currentRole, schoolContact }) => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentNavItems = [
    { id: 'beranda', label: 'Beranda', icon: LayoutDashboard },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell },
    { id: 'kalender', label: 'Kalender', icon: Calendar },
    { id: 'jadwal', label: 'Jadwal Sekolah', icon: Clock },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: Compass },
    { id: 'profil', label: 'Profil & Sandi', icon: UserIcon },
    { id: 'kontak', label: 'Kontak', icon: Phone },
  ];

  const adminNavItems = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'announcements', label: 'Pengumuman', icon: Bell },
    { id: 'calendar', label: 'Kalender', icon: Calendar },
    { id: 'activities', label: 'Jadwal Kegiatan', icon: Clock },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: Compass },
    { id: 'students', label: 'Akun Siswa', icon: Users },
    { id: 'profile', label: 'Profil Sekolah', icon: Building2 },
  ];

  const navItems = currentRole === 'admin' ? adminNavItems : studentNavItems;

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C] text-white border-b border-slate-800 shadow-md">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap leading-none">
                INFOSEKOLAH
              </span>
              <span className="text-[10px] text-blue-200/80 font-medium tracking-wide uppercase mt-0.5 whitespace-nowrap max-w-[150px] truncate">
                {schoolContact?.name || 'MTsN 2 Bombana'}
              </span>
            </div>
            {isAdmin && currentRole === 'admin' && (
              <span className="ml-2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                Panel Admin
              </span>
            )}
            {isAdmin && currentRole === 'siswa' && (
              <button
                type="button"
                onClick={() => { window.location.hash = 'admin'; }}
                className="ml-2 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
                title="Kembali ke Dashboard Administrator"
              >
                <span>← Kembali ke Panel Admin</span>
              </button>
            )}
            {!isAdmin && (
              <span className="ml-2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-900/60 text-blue-200 border border-blue-700/40">
                Portal Siswa
              </span>
            )}
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (User profile & Logout) */}
          <div className="flex items-center gap-3 shrink-0">
            {user && (
              <button
                type="button"
                onClick={() => {
                  if (currentRole === 'siswa') {
                    setActiveTab('profil');
                  }
                }}
                className={`hidden md:flex items-center gap-2 pr-2 border-r border-slate-700/80 text-right ${currentRole === 'siswa' ? 'hover:opacity-80 cursor-pointer' : ''}`}
                title={currentRole === 'siswa' ? 'Buka Pengaturan Profil & Sandi Siswa' : undefined}
              >
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-blue-300">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div className="text-left leading-tight">
                  <p className="text-xs font-medium text-white max-w-[130px] truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{user.role === 'admin' ? 'Pengelola Sekolah' : user.classGrade || 'Siswa'}</p>
                </div>
              </button>
            )}

            <button
              onClick={logout}
              title="Keluar dari Aplikasi"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600/90 text-white hover:bg-rose-500 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081220] border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 border-b border-slate-800/80 mb-2">
            <p className="text-xs text-slate-400">Masuk sebagai:</p>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-blue-400">{user?.role === 'admin' ? 'Administrator' : `Siswa (${user?.classGrade || 'Aktif'})`}</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
