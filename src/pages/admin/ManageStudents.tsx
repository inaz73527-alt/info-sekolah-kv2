import React, { useState, useMemo } from 'react';
import { User } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  X,
  KeyRound,
  ShieldAlert,
  UserCheck,
  UserX,
  Mail,
  Phone,
} from 'lucide-react';

interface ManageStudentsProps {
  students: User[];
  onRefreshData: () => void;
}

export const ManageStudents: React.FC<ManageStudentsProps> = ({
  students,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [email, setEmail] = useState('');
  const [classGrade, setClassGrade] = useState('VII-A (Kelas 7A)');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<User['status']>('Aktif');
  const [gender, setGender] = useState<'L' | 'P'>('L');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const classes = [
    'Semua',
    'VII-A (Kelas 7A)',
    'VII-B (Kelas 7B)',
    'VII-C (Kelas 7C)',
    'VII-D (Kelas 7D)',
    'VIII-A (Kelas 8A)',
    'VIII-B (Kelas 8B)',
    'VIII-C (Kelas 8C)',
    'VIII-D (Kelas 8D)',
    'IX-A (Kelas 9A)',
    'IX-B (Kelas 9B)',
    'IX-C (Kelas 9C)',
    'IX-D (Kelas 9D)',
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((std) => {
      const matchSearch =
        std.name.toLowerCase().includes(search.toLowerCase()) ||
        (std.nisn && std.nisn.includes(search)) ||
        std.email.toLowerCase().includes(search.toLowerCase());
      const matchClass = filterClass === 'Semua' || std.classGrade === filterClass;
      const matchStatus = filterStatus === 'Semua' || std.status === filterStatus;
      return matchSearch && matchClass && matchStatus;
    });
  }, [students, search, filterClass, filterStatus]);

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setNisn(`00${Math.floor(10000000 + Math.random() * 90000000)}`);
    setEmail('');
    setClassGrade('VII-A (Kelas 7A)');
    setPhone('0812-');
    setStatus('Aktif');
    setGender('L');
    setIsModalOpen(true);
  };

  const openEditModal = (std: User) => {
    setEditingStudent(std);
    setName(std.name);
    setNisn(std.nisn || '');
    setEmail(std.email);
    setClassGrade(std.classGrade || 'VII-A (Kelas 7A)');
    setPhone(std.phone || '');
    setStatus(std.status || 'Aktif');
    setGender(std.gender || 'L');
    setIsModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nisn.trim()) return;

    try {
      const studentToSave: User = {
        id: editingStudent ? editingStudent.id : `std-${Date.now()}`,
        name: name.trim(),
        email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@siswa.sch.id`,
        role: 'siswa',
        nisn: nisn.trim(),
        classGrade: classGrade.trim(),
        phone: phone.trim() || undefined,
        status,
        gender,
        joinedYear: editingStudent?.joinedYear || 2026,
      };

      db.saveStudent(studentToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg(editingStudent ? 'Data siswa berhasil diperbarui!' : 'Akun siswa baru berhasil ditambahkan!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan akun siswa');
    }
  };

  const handleDelete = (id: string, stdName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun siswa "${stdName}" dari pangkalan data?`)) {
      try {
        db.deleteStudent(id, token);
        onRefreshData();
        setToastMsg('Akun siswa berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus akun siswa');
      }
    }
  };

  const handleResetPin = (std: User) => {
    if (confirm(`Reset PIN login untuk siswa ${std.name} ke default "123456"?`)) {
      setToastMsg(`PIN akun ${std.name} berhasil direset ke "123456".`);
      setTimeout(() => setToastMsg(null), 4000);
    }
  };

  const handleToggleStatus = (std: User) => {
    const nextStatus = std.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
    try {
      const updated: User = { ...std, status: nextStatus };
      db.saveStudent(updated, token);
      onRefreshData();
      setToastMsg(`Status akun ${std.name} diubah menjadi "${nextStatus}".`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Kelola Akun & Basis Data Siswa
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Administrasi identitas siswa, nomor induk (NISN), penetapan rombongan belajar (rombel), dan pengaturan akun.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa Baru</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, NISN, atau email siswa..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c === 'Semua' ? 'Semua Kelas (7, 8, 9)' : c}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Status Aktif</option>
              <option value="Nonaktif">Status Nonaktif</option>
            </select>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Students Data Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">NISN</th>
                <th className="p-3.5">Nama Lengkap Siswa</th>
                <th className="p-3.5">Kelas / Rombel</th>
                <th className="p-3.5">Email Siswa</th>
                <th className="p-3.5">Status Akun</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada data siswa yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-slate-800 whitespace-nowrap">
                      {std.nisn || '-'}
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 whitespace-nowrap">
                      <div>{std.name}</div>
                      {std.phone && (
                        <div className="text-[11px] text-slate-400 font-mono">{std.phone}</div>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap font-medium text-blue-900">
                      {std.classGrade || '-'}
                    </td>
                    <td className="p-3.5 text-slate-600 whitespace-nowrap font-mono">{std.email}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          std.status === 'Aktif'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {std.status || 'Aktif'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResetPin(std)}
                          className="p-1.5 rounded text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Reset Kata Sandi / PIN ke 123456"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(std)}
                          className={`p-1.5 rounded transition-colors ${
                            std.status === 'Aktif'
                              ? 'text-slate-500 hover:bg-slate-100'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={std.status === 'Aktif' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                        >
                          {std.status === 'Aktif' ? (
                            <UserX className="w-3.5 h-3.5" />
                          ) : (
                            <UserCheck className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => openEditModal(std)}
                          className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Data Siswa"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(std.id, std.name)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn text-xs">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingStudent ? 'Edit Akun & Identitas Siswa' : 'Registrasi Akun Siswa Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-5 space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Ilham Ramadhan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NISN (10 Digit Angka)</label>
                  <input
                    type="text"
                    required
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="0078923456"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas / Rombel</label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {classes.filter((c) => c !== 'Semua').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Email Siswa</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama.siswa@siswa.sch.id"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Keaktifan</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif / Cuti</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50/80 p-3 rounded-lg border border-blue-100 text-blue-900 leading-relaxed">
                PIN default akun siswa baru adalah <code className="font-mono font-bold">123456</code>. Siswa dapat menggunakan NISN atau email untuk masuk ke portal.
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-xs"
                >
                  {editingStudent ? 'Simpan Perubahan' : 'Daftarkan Siswa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
