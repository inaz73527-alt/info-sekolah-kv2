import React, { useState, useMemo } from 'react';
import { Extracurricular, User } from '../../types';
import {
  Compass,
  Search,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  Sun,
  Layers,
} from 'lucide-react';

interface EkskulTabProps {
  extracurriculars: Extracurricular[];
  currentUser?: User | null;
  onRefreshData?: () => void;
}

export const EkskulTab: React.FC<EkskulTabProps> = ({
  extracurriculars,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('Semua');

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredEkskul = useMemo(() => {
    return extracurriculars.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchDay = selectedDay === 'Semua' || item.day.toLowerCase() === selectedDay.toLowerCase();
      return matchSearch && matchDay;
    });
  }, [extracurriculars, searchQuery, selectedDay]);

  // Day mapping breakdown for quick glance
  const dayScheduleOverview = [
    { day: 'Senin', items: ['Les Bahasa Inggris', 'Paskibraka/PBB'] },
    { day: 'Selasa', items: ['Pramuka'] },
    { day: 'Rabu', items: ['Tari', 'Tahfiz'] },
    { day: 'Kamis', items: ['Marching Band'] },
    { day: 'Jum\'at', items: ['Liga Madrasah', 'Sholawat'] },
    { day: 'Sabtu', items: ['Marching Band', 'Latihan Upacara untuk hari Senin'] },
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-600" />
              Jadwal Kegiatan Sore & Ekstrakurikuler
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Program pengembangan minat, bakat, keagamaan, seni, dan kepemimpinan siswa MTsN 2 Bombana.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            {filteredEkskul.length} Cabang Kegiatan Sore
          </span>
        </div>

        {/* Search & Day Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kegiatan ekstrakurikuler sore..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Summary Grid by Day */}
      <div className="bg-gradient-to-r from-[#0B192C] to-[#1E3E62] text-white rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-300" />
          <h2 className="text-sm sm:text-base font-bold text-white">
            Agenda Kegiatan Sore Berdasarkan Hari:
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {dayScheduleOverview.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDay(item.day === 'Jum\'at' ? 'Jumat' : item.day)}
              className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 cursor-pointer transition-colors"
            >
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-1.5">
                {item.day}
              </span>
              <ul className="space-y-1">
                {item.items.map((sub, sIdx) => (
                  <li key={sIdx} className="text-[11px] font-medium text-white flex items-start gap-1 leading-tight">
                    <span className="text-blue-400">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Extracurricular Cards Grid (Clean: No time/hours, no instructor, no phone, no achievements, no register button) */}
      {filteredEkskul.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
          Tidak ada kegiatan ekstrakurikuler yang sesuai dengan filter hari atau pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEkskul.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200/60 font-mono">
                      {item.day}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
                      Kegiatan Sore
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
