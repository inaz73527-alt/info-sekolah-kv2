import React from 'react';
import { User, Announcement, AcademicEvent, ActivitySchedule, SchoolContactInfo } from '../../types';
import {
  Bell,
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  Compass,
  MapPin,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Building,
} from 'lucide-react';

interface BerandaTabProps {
  user: User | null;
  announcements: Announcement[];
  calendarEvents: AcademicEvent[];
  activities: ActivitySchedule[];
  schoolContact: SchoolContactInfo;
  onNavigateTab: (tab: string) => void;
  onSelectAnnouncement: (item: Announcement) => void;
}

export const BerandaTab: React.FC<BerandaTabProps> = ({
  user,
  announcements,
  calendarEvents,
  activities,
  schoolContact,
  onNavigateTab,
  onSelectAnnouncement,
}) => {
  const pinnedAnnouncements = announcements.filter((a) => a.isPinned);
  const recentAnnouncements = announcements.slice(0, 3);
  const upcomingEvents = calendarEvents.slice(0, 3);
  const todayActivities = activities.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#1E40AF] text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-blue-200 border border-white/10 mb-3">
            <span>Tahun Ajaran 2026/2027</span>
            <span aria-hidden="true">·</span>
            <span>Semester Ganjil</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Selamat Datang, {user?.name || 'Siswa'}!
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed mb-6">
            Portal resmi {schoolContact?.name || 'MTsN 2 Bombana'} menghadirkan seluruh kebutuhan informasi sekolah Anda mulai dari pengumuman resmi, kalender akademik, jadwal upacara & apel, jam masuk/pulang, hingga kegiatan sore ekstrakurikuler.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('pengumuman')}
              className="px-4 py-2 bg-white text-[#0B192C] font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              Lihat Pengumuman Terbaru
            </button>
            <button
              onClick={() => onNavigateTab('jadwal')}
              className="px-4 py-2 bg-blue-700/70 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors border border-blue-400/30 flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              Jadwal Sekolah & Masuk/Pulang
            </button>
          </div>
        </div>
      </div>

      {/* Pinned Announcement Alert (if any) */}
      {pinnedAnnouncements.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-amber-900">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex-wrap">
                <span>Pengumuman Penting</span>
                <span aria-hidden="true">·</span>
                <span className="font-normal normal-case">{pinnedAnnouncements[0].date}</span>
              </div>
              <h4 className="text-sm font-bold text-amber-950 mb-1">
                {pinnedAnnouncements[0].title}
              </h4>
              <p className="text-xs text-amber-800 line-clamp-2 leading-relaxed mb-2">
                {pinnedAnnouncements[0].content}
              </p>
              <button
                onClick={() => onSelectAnnouncement(pinnedAnnouncements[0])}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
              >
                Baca Pengumuman Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => onNavigateTab('pengumuman')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Bell className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-800">Pengumuman</p>
          <p className="text-[11px] text-slate-500">{announcements.length} edaran resmi</p>
        </button>

        <button
          onClick={() => onNavigateTab('kalender')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-800">Kalender</p>
          <p className="text-[11px] text-slate-500">Agenda & asesmen</p>
        </button>

        <button
          onClick={() => onNavigateTab('jadwal')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-800">Jadwal Sekolah</p>
          <p className="text-[11px] text-slate-500">Upacara, apel & jam KBM</p>
        </button>

        <button
          onClick={() => onNavigateTab('ekskul')}
          className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-800">Ekstrakurikuler</p>
          <p className="text-[11px] text-slate-500">Kegiatan sore madrasah</p>
        </button>

        <button
          onClick={() => onNavigateTab('profil')}
          className="p-4 bg-white rounded-xl border border-blue-200/80 hover:border-blue-500 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-blue-900">Profil & Sandi</p>
          <p className="text-[11px] text-blue-600">Ubah sandi mandiri</p>
        </button>
      </div>

      {/* Main Content 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Announcements & Headmaster Note */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: Pengumuman Terbaru */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Pengumuman Sekolah Terkini</h2>
              </div>
              <button
                onClick={() => onNavigateTab('pengumuman')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => onSelectAnnouncement(ann)}
                  className="py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/70 p-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1 flex-wrap">
                    <span className="font-semibold text-blue-700">{ann.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ann.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>Oleh: {ann.author}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Sambutan Kepala Sekolah */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 text-blue-900 font-bold text-sm">
                HM
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {schoolContact.principal}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Kepala Madrasah · NIP. {schoolContact.principalNip}</p>
                <p className="text-xs text-slate-600 italic mt-3 leading-relaxed">
                  &ldquo;Pendidikan bukan hanya tentang mengisi wadah pengetahuan, melainkan menyalakan api rasa ingin tahu, budi pekerti luhur, dan integritas tinggi. Mari manfaatkan platform digital INFOSEKOLAH MTsN 2 Bombana untuk keterbukaan informasi dan kolaborasi yang bersinergi.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Agenda Kalender & Jadwal Kegiatan Rutin */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section: Agenda Terdekat */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-900">Agenda Kalender Terdekat</h2>
              </div>
              <button
                onClick={() => onNavigateTab('kalender')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Kalender Lengkap
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/60">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-mono text-blue-700 font-semibold">{evt.startDate}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700">
                      {evt.category}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{evt.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Jadwal Rutin Siswa */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900">Kegiatan Rutin Sekolah</h2>
              </div>
              <button
                onClick={() => onNavigateTab('jadwal')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Lihat Jadwal
              </button>
            </div>

            <div className="space-y-2.5">
              {todayActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                  <div className="w-14 shrink-0 font-mono text-[11px] font-bold text-blue-800 bg-blue-50 py-1 px-1.5 rounded text-center">
                    {act.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{act.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-mono">{act.time}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{act.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Contact Fast Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0B192C] text-white rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1">
              Pusat Layanan Informasi
            </h3>
            <p className="text-sm font-semibold text-white mb-2">{schoolContact.name}</p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{schoolContact.address}, {schoolContact.city}</span>
            </p>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mb-4">
              <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{schoolContact.operatingHours}</span>
            </p>
            <button
              onClick={() => onNavigateTab('kontak')}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              Hubungi Sekolah & Humas
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
