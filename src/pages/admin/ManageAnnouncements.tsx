import React, { useState } from 'react';
import { Announcement } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  X,
  AlertCircle,
  Pin,
  Calendar,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

interface ManageAnnouncementsProps {
  announcements: Announcement[];
  onRefreshData: () => void;
  onBack?: () => void;
}

export const ManageAnnouncements: React.FC<ManageAnnouncementsProps> = ({
  announcements,
  onRefreshData,
  onBack,
}) => {
  const { token, user } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('Akademik');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [author, setAuthor] = useState(user?.name ? user.name.split('(')[0].trim() : 'Bagian Kurikulum');
  const [isPinned, setIsPinned] = useState(false);
  const [priority, setPriority] = useState<Announcement['priority']>('Normal');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentSize, setAttachmentSize] = useState('');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleResetAnnouncements = () => {
    if (confirm('Apakah Anda yakin ingin mereset seluruh pengumuman ke pengumuman resmi MTsN 2 Bombana? Semua pengumuman buatan/dummy akan dihapus.')) {
      try {
        db.resetAnnouncementsToDefault(token);
        onRefreshData();
        setToastMsg('Pengumuman berhasil direset ke data resmi MTsN 2 Bombana.');
        setTimeout(() => setToastMsg(null), 3500);
      } catch (err: any) {
        alert(err.message || 'Gagal mereset pengumuman');
      }
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('Akademik');
    setContent('');
    setDate(new Date().toISOString().split('T')[0]);
    setAuthor(user?.name ? user.name.split('(')[0].trim() : 'Bagian Kurikulum');
    setIsPinned(false);
    setPriority('Normal');
    setAttachmentName('');
    setAttachmentSize('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: Announcement) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setContent(item.content);
    setDate(item.date);
    setAuthor(item.author);
    setIsPinned(!!item.isPinned);
    setPriority(item.priority);
    setAttachmentName(item.attachmentName || '');
    setAttachmentSize(item.attachmentSize || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const itemToSave: Announcement = {
        id: editingItem ? editingItem.id : `ann-${Date.now()}`,
        title: title.trim(),
        category,
        content: content.trim(),
        date,
        author: author.trim() || 'Tata Usaha',
        isPinned,
        priority,
        attachmentName: attachmentName.trim() || undefined,
        attachmentSize: attachmentName.trim() ? (attachmentSize.trim() || '1.0 MB') : undefined,
      };

      db.saveAnnouncement(itemToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg(editingItem ? 'Pengumuman berhasil diperbarui!' : 'Pengumuman baru berhasil diterbitkan!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan pengumuman');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pengumuman "${title}"?`)) {
      try {
        db.deleteAnnouncement(id, token);
        onRefreshData();
        setToastMsg('Pengumuman berhasil dihapus dari database.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus pengumuman');
      }
    }
  };

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
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
              <Bell className="w-5 h-5 text-blue-600" />
              Kelola Pengumuman Sekolah
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Publikasikan pengumuman akademik, edaran resmi, jadwal ujian, atau hari libur untuk siswa MTsN 2 Bombana.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleResetAnnouncements}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
            title="Reset seluruh pengumuman ke data resmi MTsN 2 Bombana"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Reset Pengumuman</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pengumuman Baru</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari pengumuman..."
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Tanggal</th>
                <th className="p-3.5">Judul Pengumuman</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Prioritas</th>
                <th className="p-3.5">Penulis / Unit</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Belum ada pengumuman terdaftar.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono whitespace-nowrap text-slate-500">
                      {item.date}
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 max-w-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.isPinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-600 shrink-0 fill-amber-100" />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.priority === 'Penting'
                            ? 'bg-rose-50 text-rose-700'
                            : item.priority === 'Tinggi'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap text-slate-700">{item.author}</td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Pengumuman"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Pengumuman"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingItem ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pelaksanaan Asesmen Sumatif Akhir Jenjang 2026/2027"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Kesiswaan">Kesiswaan</option>
                    <option value="Sarana">Sarana</option>
                    <option value="Libur">Libur</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Penting">Penting (Highlight)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Unit Pembuat</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Contoh: Wakasek Kurikulum"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Pengumuman</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi pengumuman lengkap secara jelas..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lampiran File (Opsional)</label>
                  <input
                    type="text"
                    value={attachmentName}
                    onChange={(e) => setAttachmentName(e.target.value)}
                    placeholder="Contoh: Panduan_Ujian_2026.pdf"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ukuran File</label>
                  <input
                    type="text"
                    value={attachmentSize}
                    onChange={(e) => setAttachmentSize(e.target.value)}
                    placeholder="Contoh: 1.5 MB"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="pinCheck" className="font-semibold text-slate-800 cursor-pointer">
                  Sematkan di bagian atas halaman siswa (Pinned)
                </label>
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
                  {editingItem ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
