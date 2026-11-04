import React from 'react';
import { ActivitySchedule } from '../../types';
import {
  Clock,
  Users,
  Sun,
  LogOut,
  Sparkles,
  Flag,
  Activity,
} from 'lucide-react';

interface JadwalTabProps {
  activities?: ActivitySchedule[];
}

export const JadwalTab: React.FC<JadwalTabProps> = () => {
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Jadwal Kegiatan & Jam Belajar MTsN 2 Bombana
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Informasi resmi jam masuk kelas, jam pulang, upacara bendera, apel pagi, dan senam kebugaran jasmani.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg self-start sm:self-auto">
            Waktu Indonesia Tengah (WITA)
          </span>
        </div>
      </div>

      {/* Primary Highlight Cards: Ringkasan Jam Masuk & Jam Pulang Sekolah */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Hari Senin */}
        <div className="bg-white rounded-2xl border-2 border-blue-500/30 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                HARI SENIN
              </span>
              <Flag className="w-4 h-4 text-blue-600" />
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Upacara & Pembelajaran Senin
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Flag className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Upacara Bendera</p>
                  <p className="font-mono text-blue-700 font-bold">07.00 - 07.30</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                <Sun className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Masuk Kelas</p>
                  <p className="font-mono text-blue-700 font-bold">07.35 WITA</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <LogOut className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Pulang Sekolah</p>
                  <p className="font-mono text-slate-800 font-bold">12.50 WITA</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 italic">
            *KBM dimulai tepat 07.35 setelah upacara bendera selesai.
          </p>
        </div>

        {/* Hari Selasa - Kamis & Sabtu */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B192C] text-white">
                SELASA, RABU, KAMIS & SABTU
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Apel Pagi & KBM Reguler
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Apel Pagi Disiplin</p>
                  <p className="font-mono text-indigo-700 font-bold">06.45 - 07.00</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <Sun className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Masuk Kelas</p>
                  <p className="font-mono text-emerald-700 font-bold">07.00 WITA</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <LogOut className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Pulang Sekolah</p>
                  <p className="font-mono text-slate-800 font-bold">12.50 WITA</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 italic">
            *Jam masuk kelas dimulai pukul 07.00 tepat setelah apel pagi.
          </p>
        </div>

        {/* Hari Jum'at */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                HARI JUM&apos;AT
              </span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Apel, Senam & Jam Pulang Jum&apos;at
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                <Users className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Apel Pagi</p>
                  <p className="font-mono text-indigo-700 font-bold">06.45 - 07.00</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <Activity className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Senam Bersama</p>
                  <p className="font-mono text-emerald-700 font-bold">Setelah Apel Pagi (07.00 - 07.30)</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                <Sun className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Masuk Kelas</p>
                  <p className="font-mono text-blue-700 font-bold">07.30 WITA</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 bg-rose-50/60 rounded-lg border border-rose-100">
                <LogOut className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Jam Pulang Jum&apos;at</p>
                  <p className="font-mono text-rose-700 font-bold">11.00 WITA</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-100 italic">
            *Khusus hari Jum&apos;at siswa pulang jam 11.00 untuk persiapan sholat Jum&apos;at.
          </p>
        </div>

      </div>
    </div>
  );
};
