import React from 'react';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">INFOSEKOLAH</p>
              <p className="text-[11px] text-slate-400">Satu Aplikasi, Semua Informasi Sekolah</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Sistem Keamanan Terenkripsi & Terotentikasi
            </span>
            <span aria-hidden="true">·</span>
            <span>MTsN 2 Bombana</span>
          </div>

          <p className="text-[11px] text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} INFOSEKOLAH. Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
};
