import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccessDeniedProps {
  onBackToStudent: () => void;
  onSwitchToLogin: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ onBackToStudent, onSwitchToLogin }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-rose-200 shadow-sm p-6 text-center">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700 mb-2">
          <Lock className="w-3.5 h-3.5" />
          403 - Akses Dibatasi
        </span>

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Halaman Khusus Administrator
        </h2>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Anda saat ini masuk sebagai <strong className="text-slate-900">{user?.name || 'Siswa'}</strong> (Peran: {user?.role || 'Umum'}). Halaman pengelolaan dan basis data admin hanya dapat diakses oleh akun pengelola sekolah yang telah terverifikasi.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-500 mb-6 text-left">
          <p className="font-semibold text-slate-700 mb-1">Kebijakan Keamanan INFOSEKOLAH:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Akses dashboard admin diproteksi pada tingkat sistem.</li>
            <li>Siswa dibatasi dari pengubahan data publik dan data pengguna lain.</li>
            <li>Percobaan akses tidak sah akan tercatat dalam log keamanan.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={onBackToStudent}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard Siswa
          </button>
          <button
            onClick={onSwitchToLogin}
            className="w-full px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            Masuk Akun Lain
          </button>
        </div>
      </div>
    </div>
  );
};
