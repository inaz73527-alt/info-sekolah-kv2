import React, { useState, useMemo } from 'react';
import { AcademicEvent } from '../../types';
import {
  Calendar as CalendarIcon,
  MapPin,
  Printer,
  ChevronRight,
  Filter,
  CheckCircle,
} from 'lucide-react';

interface KalenderTabProps {
  events: AcademicEvent[];
}

export const KalenderTab: React.FC<KalenderTabProps> = ({ events }) => {
  const [selectedSemester, setSelectedSemester] = useState<'Semua' | 'Ganjil' | 'Genap'>('Semua');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [printToast, setPrintToast] = useState(false);

  const categories = ['Semua', 'Ujian', 'Kegiatan', 'Libur', 'Administrasi'];

  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        const matchSemester = selectedSemester === 'Semua' || evt.semester === selectedSemester;
        const matchCategory = selectedCategory === 'Semua' || evt.category === selectedCategory;
        return matchSemester && matchCategory;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [events, selectedSemester, selectedCategory]);

  const handlePrint = () => {
    setPrintToast(true);
    setTimeout(() => {
      setPrintToast(false);
      window.print();
    }, 500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Ujian':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Libur':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Kegiatan':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Administrasi':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Kalender Akademik Sekolah
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Jadwal resmi semester, periode asesmen/ujian, kegiatan kesiswaan, dan hari libur sekolah.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start sm:self-auto px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-200"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak Jadwal</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Semester Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['Semua', 'Ganjil', 'Genap'] as const).map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedSemester === sem
                    ? 'bg-white text-blue-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sem === 'Semua' ? 'Semua Semester' : `Semester ${sem}`}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {printToast && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-blue-600" />
          Menyiapkan format cetak dokumen kalender akademik...
        </div>
      )}

      {/* Events Timeline List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            Tidak ada agenda yang sesuai dengan filter yang dipilih.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const startDateFormatted = new Date(evt.startDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const endDateFormatted = evt.endDate && evt.endDate !== evt.startDate
              ? new Date(evt.endDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : null;

            return (
              <div key={evt.id} className="p-5 hover:bg-slate-50/80 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getCategoryColor(evt.category)}`}>
                        {evt.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">Semester {evt.semester}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {evt.description}
                    </p>

                    {evt.location && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Lokasi: {evt.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Date badge on right side */}
                  <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-lg border sm:border-0 border-slate-200">
                    <div className="text-xs font-mono font-bold text-blue-900">
                      {startDateFormatted}
                    </div>
                    {endDateFormatted && (
                      <div className="text-[11px] font-mono text-slate-500">
                        s.d. {endDateFormatted}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
