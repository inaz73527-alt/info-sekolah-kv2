import React, { useState } from 'react';
import { AcademicEvent } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  X,
  MapPin,
  ArrowLeft,
} from 'lucide-react';

interface ManageCalendarProps {
  events: AcademicEvent[];
  onRefreshData: () => void;
  onBack?: () => void;
}

export const ManageCalendar: React.FC<ManageCalendarProps> = ({ events, onRefreshData, onBack }) => {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AcademicEvent | null>(null);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
  const [category, setCategory] = useState<AcademicEvent['category']>('Kegiatan');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    setSemester('Ganjil');
    setCategory('Kegiatan');
    setDescription('');
    setLocation('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: AcademicEvent) => {
    setEditingItem(item);
    setTitle(item.title);
    setStartDate(item.startDate);
    setEndDate(item.endDate || '');
    setSemester(item.semester);
    setCategory(item.category);
    setDescription(item.description);
    setLocation(item.location || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate) return;

    try {
      const itemToSave: AcademicEvent = {
        id: editingItem ? editingItem.id : `cal-${Date.now()}`,
        title: title.trim(),
        startDate,
        endDate: endDate ? endDate : undefined,
        semester,
        category,
        description: description.trim(),
        location: location.trim() || undefined,
      };

      db.saveCalendarEvent(itemToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg(editingItem ? 'Agenda kalender berhasil diperbarui!' : 'Agenda kalender baru berhasil ditambahkan!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan agenda');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus agenda "${title}" dari kalender?`)) {
      try {
        db.deleteCalendarEvent(id, token);
        onRefreshData();
        setToastMsg('Agenda kalender berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus agenda');
      }
    }
  };

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.location && e.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2.5 py-1 rounded-md transition-colors cursor-pointer mr-1"
                title="Kembali ke ringkasan admin"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Kelola Kalender Akademik
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur jadwal resmi periode semester ganjil/genap, ujian sekolah, dan libur akademik MTsN 2 Bombana.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Agenda Baru</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari agenda kalender..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Tanggal Pelaksanaan</th>
                <th className="p-3.5">Agenda / Kegiatan</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Semester</th>
                <th className="p-3.5">Lokasi</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada agenda kalender terdaftar.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono whitespace-nowrap text-slate-700">
                      <div>{item.startDate}</div>
                      {item.endDate && item.endDate !== item.startDate && (
                        <div className="text-[10px] text-slate-400">s.d. {item.endDate}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 max-w-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.description}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">Semester {item.semester}</td>
                    <td className="p-3.5 whitespace-nowrap text-slate-500">
                      {item.location || '-'}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Agenda"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Agenda"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingItem ? 'Edit Agenda Kalender' : 'Tambah Agenda Kalender'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Agenda</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Penilaian Akhir Semester (PAS) Ganjil"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Selesai (Opsional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Ganjil">Semester Ganjil</option>
                    <option value="Genap">Semester Genap</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Agenda</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Ujian">Ujian</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Libur">Libur</option>
                    <option value="Administrasi">Administrasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lokasi (Opsional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Gedung Serbaguna / Ruang CBT"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi & Keterangan</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan rincian agenda pelaksanaan..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
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
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan Agenda'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
