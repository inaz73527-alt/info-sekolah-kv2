import React, { useState, useEffect } from 'react';
import { db } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  Eye,
  EyeOff,
  MapPin,
} from 'lucide-react';

interface LoginPageProps {
  onSuccessLogin: (role: 'admin' | 'siswa') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccessLogin }) => {
  const { loginAsStudent, loginAsAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'siswa' | 'admin'>('siswa');

  // Student form state - empty before typing
  const [studentId, setStudentId] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [showStudentPin, setShowStudentPin] = useState(false);

  // Admin form state - empty before typing
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await loginAsStudent(studentId, studentPin);
      if (res.success) {
        onSuccessLogin('siswa');
      } else {
        setErrorMsg(res.message || 'Gagal masuk akun siswa');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan pada sistem saat memproses login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const res = await loginAsAdmin(adminId, adminPass);
      if (res.success) {
        onSuccessLogin('admin');
      } else {
        setErrorMsg(res.message || 'Gagal masuk akun administrator');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan pada sistem saat memproses login.');
    } finally {
      setIsLoading(false);
    }
  };

  const [schoolContact, setSchoolContact] = useState(() => db.getSchoolContact());

  useEffect(() => {
    const handleUpdate = () => {
      setSchoolContact(db.getSchoolContact());
    };
    window.addEventListener('infosekolah_db_updated', handleUpdate);
    return () => window.removeEventListener('infosekolah_db_updated', handleUpdate);
  }, []);

  const handleFillAccount = (role: 'admin' | 'siswa') => {
    setErrorMsg(null);
    if (role === 'siswa') {
      setActiveTab('siswa');
      setStudentId('0068492011');
      setStudentPin('123456');
    } else {
      setActiveTab('admin');
      setAdminId('admin@infosekolah.sch.id');
      setAdminPass('infosekolahmtsn2bombana12321');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header bar */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">
                INFOSEKOLAH
              </span>
              <span className="text-[11px] text-blue-200/80 font-medium tracking-wide">
                {schoolContact.slogan || 'Satu Aplikasi, Semua Informasi Sekolah'}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>{schoolContact.name}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">Akreditasi {schoolContact.accreditation.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: School Presentation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Sistem Portal Informasi Terpadu & Terverifikasi
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight leading-tight text-balance">
                Selamat Datang di Portal Resmi {schoolContact.name}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Akses cepat seluruh informasi pengumuman resmi, kalender akademik, jadwal upacara & apel pagi, jam masuk/pulang belajar, hingga kegiatan sore ekstrakurikuler {schoolContact.name} dalam satu sistem yang aman dan terpadu.
              </p>
            </div>

            {/* School Information Card (Image Removed) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{schoolContact.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{schoolContact.address}, {schoolContact.city}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Akreditasi</span>
                  <span className="font-semibold text-emerald-700">{schoolContact.accreditation.split(' ')[0]} (Unggul)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Zona Waktu</span>
                  <span className="font-semibold text-blue-700">WITA (Sulawesi)</span>
                </div>
              </div>
            </div>

            {/* Quick Access Helper */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  Bantuan Akun Terdaftar MTsN 2 Bombana:
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
                  Akun Aktif
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillAccount('siswa')}
                  disabled={isLoading}
                  className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 text-left transition-colors flex items-center justify-between group disabled:opacity-50 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-blue-900 group-hover:text-blue-700">Akun Siswa: Ahmad Fauzi</p>
                    </div>
                    <p className="text-[11px] text-blue-600">NISN: 0068492011 · PIN: 123456</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleFillAccount('admin')}
                  disabled={isLoading}
                  className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 text-left transition-colors flex items-center justify-between group disabled:opacity-50 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-emerald-900 group-hover:text-emerald-700">Akun Admin: Pengelola</p>
                    </div>
                    <p className="text-[11px] text-emerald-700">admin@infosekolah.sch.id</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Two Distinct Login Options */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
              
              {/* Distinct Role Tabs Selection */}
              <div className="p-3 bg-slate-100/80 border-b border-slate-200">
                <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-xl border border-slate-200/70">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('siswa');
                      setErrorMsg(null);
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                      activeTab === 'siswa'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Login Siswa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('admin');
                      setErrorMsg(null);
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                      activeTab === 'admin'
                        ? 'bg-[#0B192C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Login Admin</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-7">
                {errorMsg && (
                  <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="leading-snug">{errorMsg}</div>
                  </div>
                )}

                {activeTab === 'siswa' ? (
                  /* ================= LOGIN SISWA FORM ================= */
                  <form onSubmit={handleStudentSubmit} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800">
                          Nomor Induk Siswa Nasional (NISN)
                        </label>
                        <span className="text-[11px] text-slate-500">10 Digit Angka</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Contoh: 0068492011"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-mono"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Atau gunakan email resmi siswa (contoh: fauzi.rahman@siswa.sch.id)
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800">
                          Kata Sandi / PIN Siswa
                        </label>
                        <span className="text-[11px] text-slate-500">Dapat diubah di menu Profil</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showStudentPin ? 'text' : 'password'}
                          required
                          value={studentPin}
                          onChange={(e) => setStudentPin(e.target.value)}
                          placeholder="Masukkan kata sandi / PIN siswa"
                          className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowStudentPin(!showStudentPin)}
                          title={showStudentPin ? 'Sembunyikan sandi (sensor)' : 'Tampilkan sandi'}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showStudentPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {isLoading ? 'Memverifikasi...' : 'Masuk Dashboard Siswa'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Akun siswa dibuat secara terpusat oleh pihak Tata Usaha MTsN 2 Bombana. Setelah berhasil masuk, Anda dapat memperbarui kata sandi secara mandiri pada menu Profil.
                      </p>
                    </div>
                  </form>
                ) : (
                  /* ================= LOGIN ADMIN FORM ================= */
                  <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Resmi Admin / Username Petugas
                      </label>
                      <input
                        type="text"
                        required
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        placeholder="Contoh: admin@infosekolah.sch.id"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800">
                          Kata Sandi Pengelola
                        </label>
                        <span className="text-[11px] text-slate-500">Tersensor otomatis</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showAdminPass ? 'text' : 'password'}
                          required
                          value={adminPass}
                          onChange={(e) => setAdminPass(e.target.value)}
                          placeholder="Ketik kata sandi administrator..."
                          className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPass(!showAdminPass)}
                          title={showAdminPass ? 'Sembunyikan sandi (sensor)' : 'Tampilkan kata sandi'}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 px-4 bg-[#0B192C] hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        <Lock className="w-4 h-4 text-blue-400" />
                        {isLoading ? 'Memverifikasi...' : 'Masuk Panel Admin'}
                      </button>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        Halaman ini terproteksi keamanan ketat. Akses terbatas khusus pengelola madrasah dan petugas Tata Usaha MTsN 2 Bombana terverifikasi.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Card Footer: Security Policy */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Sesi aman 256-bit SSL
                </span>
                <span>Versi 2.4.0</span>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} INFOSEKOLAH · {schoolContact.name}. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};
