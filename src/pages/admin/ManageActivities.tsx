import React, { useState } from 'react';
import { ActivitySchedule } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Clock,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  X,
  MapPin,
  Users,
} from 'lucide-react';

interface ManageActivitiesProps {
  activities: ActivitySchedule[];
  onRefreshData: () => void;
}

export const ManageActivities: React.FC<ManageActivitiesProps> = ({
  activities,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActivitySchedule | null>(null);

  const [title, setTitle] = useState('');
  const [day, setDay] = useState<ActivitySchedule['day']>('Senin');
  const [time, setTime] = useState('07.00 - 07.30');
  const [location, setLocation] = useState('MTsN 2 Bombana');
  const [category, setCategory] = useState<ActivitySchedule['category']>('Rutin');
  const [targetAudience, setTargetAudience] = useState('Seluruh Siswa');
  const [organizer, setOrganizer] = useState('Kesiswaan MTsN 2 Bombana');
  const [description, setDescription] = useState('');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setDay('Senin');
    setTime('07.00 - 07.30');
    setLocation('MTsN 2 Bombana');
    setCategory('Rutin');
    setTargetAudience('Seluruh Siswa');
    setOrganizer('Kesiswaan MTsN 2 Bombana');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: ActivitySchedule) => {
    setEditingItem(item);
    setTitle(item.title);
    setDay(item.day);
    setTime(item.time);
    setLocation(item.location);
    setCategory(item.category);
    setTargetAudience(item.targetAudience);
    setOrganizer(item.organizer);
    setDescription(item.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    try {
      const itemToSave: ActivitySchedule = {
        id: editingItem ? editingItem.id : `act-${Date.now()}`,
        title: title.trim(),
        day,
        time: time.trim(),
        location: location.trim(),
        category,
        targetAudience: targetAudience.trim(),
        organizer: organizer.trim(),
        description: description.trim(),
      };

      db.saveActivitySchedule(itemToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg(editingItem ? 'Jadwal kegiatan berhasil diperbarui!' : 'Jadwal kegiatan baru berhasil ditambahkan!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan jadwal kegiatan');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus jadwal "${title}"?`)) {
      try {
        db.deleteActivitySchedule(id, token);
        onRefreshData();
        setToastMsg('Jadwal kegiatan berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus jadwal');
      }
    }
  };

  const filtered = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.day.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            Kelola Jadwal Kegiatan Sekolah
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur jadwal upacara mingguan, kegiatan literasi, senam, kajian, dan pembinaan siswa.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Baru</span>
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
          placeholder="Cari jadwal kegiatan..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Hari</th>
                <th className="p-3.5">Waktu</th>
                <th className="p-3.5">Nama Kegiatan</th>
                <th className="p-3.5">Lokasi</th>
                <th className="p-3.5">Sasaran</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Tidak ada jadwal kegiatan.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded font-mono">
                        {item.day}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono whitespace-nowrap text-slate-700">{item.time}</td>
                    <td className="p-3.5 font-medium text-slate-900 max-w-xs">
                      <div>{item.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{item.description}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-slate-700">{item.location}</td>
                    <td className="p-3.5 whitespace-nowrap text-slate-500">{item.targetAudience}</td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Jadwal"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Jadwal"
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
                {editingItem ? 'Edit Jadwal Kegiatan' : 'Tambah Jadwal Kegiatan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kegiatan</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Upacara Bendera Hari Senin"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hari Pelaksanaan</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu / Jam</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Contoh: 06.45 - 07.45 WIB"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Tempat</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Lapangan Upacara Utama"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Rutin">Rutin</option>
                    <option value="Pembinaan">Pembinaan</option>
                    <option value="Khusus">Khusus</option>
                    <option value="Lomba">Lomba</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sasaran Peserta</label>
                  <input
                    type="text"
                    required
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Contoh: Seluruh Siswa & Guru"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penyelenggara / PJ</label>
                  <input
                    type="text"
                    required
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="Contoh: Tim Kesiswaan"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan kegiatan..."
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
                  {editingItem ? 'Simpan Perubahan' : 'Tambahkan Jadwal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
