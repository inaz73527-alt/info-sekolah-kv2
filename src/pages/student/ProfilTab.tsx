import React, { useState } from 'react';
import { User, SchoolContactInfo } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Lock,
} from 'lucide-react';

interface ProfilTabProps {
  user: User | null;
  schoolContact?: SchoolContactInfo;
}

export const ProfilTab: React.FC<ProfilTabProps> = ({ user, schoolContact }) => {
  const { changeStudentPassword } = useAuth();

  // Password form states
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Visibility toggles
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!currentPin) {
      setErrorMsg('Harap masukkan kata sandi saat ini.');
      return;
    }

    if (newPin.length < 4) {
      setErrorMsg('Kata sandi baru minimal terdiri dari 4 karakter.');
      return;
    }

    if (newPin !== confirmPin) {
      setErrorMsg('Konfirmasi kata sandi baru tidak cocok. Harap periksa kembali.');
      return;
    }

    if (currentPin === newPin) {
      setErrorMsg('Kata sandi baru tidak boleh sama persis dengan kata sandi saat ini.');
      return;
    }

    setLoading(true);
    try {
      const res = await changeStudentPassword(currentPin, newPin);
      if (res.success) {
        setSuccessMsg(res.message || 'Kata sandi berhasil diperbarui!');
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
      } else {
        setErrorMsg(res.message || 'Gagal mengubah kata sandi');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan saat memproses pembaruan kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Portal Mandiri Siswa · {schoolContact?.name || 'MTsN 2 Bombana'}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-blue-600" />
              Profil Siswa & Pengaturan Kata Sandi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Informasi data kesiswaan terdaftar serta formulir penggantian kata sandi / PIN akun siswa secara mandiri.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student Biodata Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
            {/* Top Identity banner */}
            <div className="bg-gradient-to-r from-[#0B192C] to-blue-900 p-6 text-white text-center relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 border-4 border-white/20 flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3">
                {user?.name ? user.name.charAt(0) : 'S'}
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">{user?.name || 'Siswa MTsN 2 Bombana'}</h2>
              <p className="text-xs text-blue-200 font-mono mt-0.5">NISN: {user?.nisn || '0068492011'}</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Status Akun: {user?.status || 'Aktif'}</span>
              </div>
            </div>

            {/* Detailed Biodata List */}
            <div className="p-5 divide-y divide-slate-100 text-xs text-slate-700">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Kelas / Rombel
                </span>
                <span className="font-semibold text-slate-900">{user?.classGrade || 'IX-A (Kelas 9A)'}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email Terdaftar
                </span>
                <span className="font-mono text-slate-900">{user?.email || 'siswa@mtsn2bombana.sch.id'}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Kontak / HP
                </span>
                <span className="font-mono text-slate-900">{user?.phone || '0857-1234-5678'}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Tahun Angkatan
                </span>
                <span className="font-semibold text-slate-900">{user?.joinedYear || 2024}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">Madrasah</span>
                <span className="font-semibold text-slate-900">{schoolContact?.name || 'MTsN 2 Bombana'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Change Password Card */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-blue-600" />
                Ubah Kata Sandi / PIN Siswa
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Jaga keamanan akun Anda. Ubah kata sandi secara berkala dan jangan bagikan kepada orang lain.
              </p>
            </div>

            {/* Feedback Notifications */}
            {successMsg && (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p className="font-bold text-emerald-950">Berhasil!</p>
                  <p>{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <p className="font-bold text-rose-950">Terjadi Kesalahan</p>
                  <p>{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Kata Sandi Saat Ini
                  </label>
                  <span className="text-[11px] text-slate-500">Sandi awal default: 123456</span>
                </div>
                <div className="relative">
                  <input
                    type={showCurrentPin ? 'text' : 'password'}
                    required
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="Masukkan kata sandi saat ini"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPin(!showCurrentPin)}
                    title={showCurrentPin ? 'Sembunyikan sandi (sensor)' : 'Tampilkan sandi'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showCurrentPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Kata Sandi Baru
                  </label>
                  <span className="text-[11px] text-slate-500">Minimal 4 karakter</span>
                </div>
                <div className="relative">
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Masukkan kata sandi baru yang diinginkan"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    title={showNewPin ? 'Sembunyikan sandi (sensor)' : 'Tampilkan sandi'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Ulangi Kata Sandi Baru
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPin ? 'text' : 'password'}
                    required
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="Ketik ulang kata sandi baru untuk konfirmasi"
                    className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    title={showConfirmPin ? 'Sembunyikan sandi (sensor)' : 'Tampilkan sandi'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{loading ? 'Menyimpan Sandi...' : 'Simpan Perubahan Kata Sandi'}</span>
                </button>
              </div>
            </form>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Catatan Keamanan Siswa MTsN 2 Bombana:
              </p>
              <p className="text-[11px] leading-relaxed">
                Kata sandi baru yang Anda simpan akan langsung aktif seketika pada sistem database sekolah. Saat Anda melakukan login ulang pada aplikasi INFOSEKOLAH, gunakan NISN dan kata sandi baru yang telah Anda tentukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
