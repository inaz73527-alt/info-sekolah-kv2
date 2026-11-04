import React from 'react';
import {
  Bell,
  Calendar,
  Clock,
  Compass,
  Users,
  ShieldCheck,
  ArrowRight,
  Database,
  Building2,
} from 'lucide-react';
import { db } from '../../services/storage';

interface AdminOverviewProps {
  stats: {
    announcementsCount: number;
    calendarEventsCount: number;
    activitiesCount: number;
    ekskulCount: number;
    studentsCount: number;
  };
  onNavigateTab: (tab: string) => void;
  onRefreshData: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  stats,
  onNavigateTab,
  onRefreshData,
}) => {
  const handleResetData = () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh database aplikasi ke data resmi MTsN 2 Bombana?')) {
      db.resetToDefaultData();
      onRefreshData();
      alert('Database berhasil direset ke data resmi MTsN 2 Bombana.');
    }
  };

  const kpis = [
    {
      title: 'Total Akun Siswa',
      value: stats.studentsCount,
      tab: 'students',
      icon: Users,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      label: 'Siswa Kelas VII, VIII, IX',
    },
    {
      title: 'Pengumuman Aktif',
      value: stats.announcementsCount,
      tab: 'announcements',
      icon: Bell,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      label: 'Edaran & Asesmen Madrasah',
    },
    {
      title: 'Jadwal & Jam Sekolah',
      value: stats.activitiesCount,
      tab: 'activities',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      label: 'Upacara, Apel, Masuk & Pulang',
    },
    {
      title: 'Kegiatan Sore / Ekskul',
      value: stats.ekskulCount,
      tab: 'ekskul',
      icon: Compass,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      label: 'Cabang Minat, Seni & Olahraga',
    },
    {
      title: 'Agenda Kalender',
      value: stats.calendarEventsCount,
      tab: 'calendar',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      label: 'Jadwal Asesmen & Libur',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Hero Header */}
      <div className="bg-[#0B192C] text-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sistem Pengelola Terverifikasi · MTsN 2 Bombana
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Pusat Kendali Administrator INFOSEKOLAH
            </h1>
            <p className="text-xs text-blue-200/90 max-w-xl">
              Perubahan data yang dilakukan pada modul ini tersimpan langsung di database dan seketika tampil pada portal siswa MTsN 2 Bombana.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors border border-slate-700"
              title="Reset seluruh database aplikasi ke kondisi awal"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              Reset Data Default
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(kpi.tab)}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {kpi.value}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {kpi.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:underline mt-4">
                <span>Kelola Modul</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Aksi Cepat Pengelolaan:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigateTab('announcements')}
            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">+ Buat Pengumuman</p>
            <p className="text-[11px] text-slate-500">Publikasi edaran baru</p>
          </button>

          <button
            onClick={() => onNavigateTab('calendar')}
            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">+ Tambah Agenda</p>
            <p className="text-[11px] text-slate-500">Kalender akademik</p>
          </button>

          <button
            onClick={() => onNavigateTab('activities')}
            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">Jadwal Sekolah</p>
            <p className="text-[11px] text-slate-500">Upacara, apel & jam masuk</p>
          </button>

          <button
            onClick={() => onNavigateTab('ekskul')}
            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">Kegiatan Sore</p>
            <p className="text-[11px] text-slate-500">8 cabang ekstrakurikuler</p>
          </button>

          <button
            onClick={() => onNavigateTab('students')}
            className="p-3 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-colors"
          >
            <p className="text-xs font-bold text-slate-900">+ Registrasi Siswa</p>
            <p className="text-[11px] text-slate-500">Tambah data NISN</p>
          </button>

          <button
            onClick={() => onNavigateTab('profile')}
            className="p-3 rounded-lg bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-left transition-colors"
          >
            <p className="text-xs font-bold text-blue-900">Profil MTsN 2 Bombana</p>
            <p className="text-[11px] text-blue-700">Alamat, kontak & kepsek</p>
          </button>
        </div>
      </div>
    </div>
  );
};
