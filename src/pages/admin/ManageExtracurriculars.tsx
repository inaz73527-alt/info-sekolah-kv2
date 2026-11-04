import React, { useState } from 'react';
import { Extracurricular } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Calendar,
} from 'lucide-react';

interface ManageExtracurricularsProps {
  extracurriculars: Extracurricular[];
  onRefreshData: () => void;
}

export const ManageExtracurriculars: React.FC<ManageExtracurricularsProps> = ({
  extracurriculars,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Extracurricular | null>(null);

  const [name, setName] = useState('');
  const [day, setDay] = useState<Extracurricular['day']>('Senin');
  const [category, setCategory] = useState<Extracurricular['category']>('Seni & Budaya');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setDay('Senin');
    setCategory('Seni & Budaya');
    setIsModalOpen(true);
  };

  const openEditModal = (item: Extracurricular) => {
    setEditingItem(item);
    setName(item.name);
    setDay(item.day || 'Senin');
    setCategory(item.category || 'Seni & Budaya');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const itemToSave: Extracurricular = {
        id: editingItem ? editingItem.id : `eks-${Date.now()}`,
        name: name.trim(),
        day,
        timeSlot: 'Kegiatan Sore',
        category,
        location: '',
        description: '',
      };

      db.saveExtracurricular(itemToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg(editingItem ? 'Ekstrakurikuler berhasil diperbarui!' : 'Ekstrakurikuler baru berhasil ditambahkan!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan ekstrakurikuler');
    }
  };

  const handleDelete = (id: string, itemName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kegiatan "${itemName}"?`)) {
      try {
        db.deleteExtracurricular(id, token);
        onRefreshData();
        setToastMsg('Ekstrakurikuler berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3500);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus');
      }
    }
  };

  const filtered = extracurriculars.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.day.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              Kelola Kegiatan Sore & Ekstrakurikuler
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola cabang kegiatan sore siswa MTsN 2 Bombana.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            + Tambah Cabang Kegiatan
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kegiatan berdasarkan nama, hari, atau deskripsi..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Hari (Kegiatan Sore)</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    Tidak ada kegiatan ekstrakurikuler terdaftar.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{item.name}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                        {item.day}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Ekskul"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Ekskul"
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
                {editingItem ? 'Edit Kegiatan Sore' : 'Tambah Kegiatan Sore Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kegiatan Sore / Ekstrakurikuler</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Marching Band, Pramuka, Tari..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hari Pelaksanaan (Sore)</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jum&apos;at</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Seni & Budaya">Seni & Budaya</option>
                    <option value="Kepemimpinan">Kepemimpinan</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Keagamaan">Keagamaan</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Sains & Teknologi">Sains & Teknologi</option>
                    <option value="Kemanusiaan">Kemanusiaan</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs transition-colors"
                >
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
