import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/storage';
import {
  Announcement,
  AcademicEvent,
  ActivitySchedule,
  Extracurricular,
  SchoolContactInfo,
  User,
} from '../../types';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AccessDenied } from '../../components/AccessDenied';
import { AdminOverview } from './AdminOverview';
import { ManageAnnouncements } from './ManageAnnouncements';
import { ManageCalendar } from './ManageCalendar';
import { ManageActivities } from './ManageActivities';
import { ManageExtracurriculars } from './ManageExtracurriculars';
import { ManageStudents } from './ManageStudents';
import { ManageSchoolProfile } from './ManageSchoolProfile';
import { ArrowLeft } from 'lucide-react';

interface AdminDashboardProps {
  onBackToStudent: () => void;
  onSwitchToLogin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToStudent,
  onSwitchToLogin,
}) => {
  const { user, isAdmin, token } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Application Data State
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => db.getAnnouncements());
  const [calendarEvents, setCalendarEvents] = useState<AcademicEvent[]>(() => db.getCalendarEvents());
  const [activities, setActivities] = useState<ActivitySchedule[]>(() => db.getActivitySchedules());
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(() => db.getExtracurriculars());
  const [students, setStudents] = useState<User[]>(() => db.getStudents());
  const [schoolContact, setSchoolContact] = useState<SchoolContactInfo>(() => db.getSchoolContact());

  const loadData = () => {
    setAnnouncements(db.getAnnouncements());
    setCalendarEvents(db.getCalendarEvents());
    setActivities(db.getActivitySchedules());
    setExtracurriculars(db.getExtracurriculars());
    setStudents(db.getStudents());
    setSchoolContact(db.getSchoolContact());
  };

  useEffect(() => {
    window.addEventListener('infosekolah_db_updated', loadData);
    return () => window.removeEventListener('infosekolah_db_updated', loadData);
  }, []);

  // MANDATORY SECURITY VERIFICATION:
  // If not logged in, or user role is NOT admin, block completely and render AccessDenied component!
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <header className="bg-[#0B192C] text-white p-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-bold tracking-tight">INFOSEKOLAH - Peringatan Keamanan</span>
          </div>
        </header>
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex items-center justify-center">
          <AccessDenied onBackToStudent={onBackToStudent} onSwitchToLogin={onSwitchToLogin} />
        </main>
        <Footer />
      </div>
    );
  }

  const stats = {
    announcementsCount: announcements.length,
    calendarEventsCount: calendarEvents.length,
    activitiesCount: activities.length,
    ekskulCount: extracurriculars.length,
    studentsCount: students.length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} currentRole="admin" schoolContact={schoolContact} />

      {/* Admin Top Navigation Ribbon with Kembali Buttons */}
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToStudent}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 shadow-2xs transition-colors cursor-pointer"
              title="Kembali ke tampilan Portal Siswa"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>Kembali ke Portal Siswa</span>
            </button>

            {activeTab !== 'overview' && (
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
                title="Kembali ke ringkasan menu admin"
              >
                <span>← Kembali ke Ringkasan Admin</span>
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Panel Administrator · <span className="text-slate-700 font-semibold">{schoolContact.name}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <AdminOverview
            stats={stats}
            onNavigateTab={setActiveTab}
            onRefreshData={loadData}
          />
        )}

        {activeTab === 'announcements' && (
          <ManageAnnouncements
            announcements={announcements}
            onRefreshData={loadData}
            onBack={() => setActiveTab('overview')}
          />
        )}

        {activeTab === 'calendar' && (
          <ManageCalendar
            events={calendarEvents}
            onRefreshData={loadData}
            onBack={() => setActiveTab('overview')}
          />
        )}

        {activeTab === 'activities' && (
          <ManageActivities
            activities={activities}
            onRefreshData={loadData}
          />
        )}

        {activeTab === 'ekskul' && (
          <ManageExtracurriculars
            extracurriculars={extracurriculars}
            onRefreshData={loadData}
          />
        )}

        {activeTab === 'students' && (
          <ManageStudents
            students={students}
            onRefreshData={loadData}
          />
        )}

        {activeTab === 'profile' && (
          <ManageSchoolProfile
            schoolContact={schoolContact}
            onRefreshData={loadData}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};
