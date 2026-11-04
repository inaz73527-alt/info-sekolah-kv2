import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/storage';
import {
  Announcement,
  AcademicEvent,
  ActivitySchedule,
  Extracurricular,
  SchoolContactInfo,
} from '../../types';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BerandaTab } from './BerandaTab';
import { PengumumanTab } from './PengumumanTab';
import { KalenderTab } from './KalenderTab';
import { JadwalTab } from './JadwalTab';
import { EkskulTab } from './EkskulTab';
import { KontakTab } from './KontakTab';

import { ProfilTab } from './ProfilTab';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface StudentDashboardProps {
  isAdminPreview?: boolean;
  onBackToAdmin?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  isAdminPreview,
  onBackToAdmin,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Application Data State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => db.getAnnouncements());
  const [calendarEvents, setCalendarEvents] = useState<AcademicEvent[]>(() => db.getCalendarEvents());
  const [activities, setActivities] = useState<ActivitySchedule[]>(() => db.getActivitySchedules());
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(() => db.getExtracurriculars());
  const [schoolContact, setSchoolContact] = useState<SchoolContactInfo>(() => db.getSchoolContact());

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const loadData = () => {
    setAnnouncements(db.getAnnouncements());
    setCalendarEvents(db.getCalendarEvents());
    setActivities(db.getActivitySchedules());
    setExtracurriculars(db.getExtracurriculars());
    setSchoolContact(db.getSchoolContact());
  };

  useEffect(() => {
    window.addEventListener('infosekolah_db_updated', loadData);
    return () => window.removeEventListener('infosekolah_db_updated', loadData);
  }, []);

  const handleSelectAnnouncementFromHome = (ann: Announcement) => {
    setSelectedAnnouncement(ann);
    setActiveTab('pengumuman');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} currentRole="siswa" schoolContact={schoolContact} />

      {/* Admin Preview Mode Ribbon */}
      {isAdminPreview && (
        <div className="bg-amber-500 text-slate-950 border-b border-amber-600 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0" />
              <span>
                <strong>Mode Pratinjau Administrator:</strong> Anda sedang melihat Portal Siswa MTsN 2 Bombana.
              </span>
            </div>
            {onBackToAdmin && (
              <button
                type="button"
                onClick={onBackToAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Panel Admin</span>
              </button>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'beranda' && (
          <BerandaTab
            user={user}
            announcements={announcements}
            calendarEvents={calendarEvents}
            activities={activities}
            schoolContact={schoolContact}
            onNavigateTab={setActiveTab}
            onSelectAnnouncement={handleSelectAnnouncementFromHome}
          />
        )}

        {activeTab === 'pengumuman' && (
          <PengumumanTab
            announcements={announcements}
            selectedAnnouncement={selectedAnnouncement}
            onSelectAnnouncement={setSelectedAnnouncement}
          />
        )}

        {activeTab === 'kalender' && <KalenderTab events={calendarEvents} />}

        {activeTab === 'jadwal' && <JadwalTab activities={activities} />}

        {activeTab === 'ekskul' && (
          <EkskulTab
            extracurriculars={extracurriculars}
            currentUser={user}
            onRefreshData={loadData}
          />
        )}

        {activeTab === 'profil' && (
          <ProfilTab
            user={user}
            schoolContact={schoolContact}
          />
        )}

        {activeTab === 'kontak' && <KontakTab schoolContact={schoolContact} />}
      </main>

      <Footer />
    </div>
  );
};
