import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Camera,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface ManageGalleryProps {
  galleryItems: GalleryItem[];
  onRefreshData: () => void;
}

export const ManageGallery: React.FC<ManageGalleryProps> = ({
  galleryItems,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Akademik');
  const [imageUrl, setImageUrl] = useState('/src/assets/images/hero_school_building_1793685901072.jpg');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [photographer, setPhotographer] = useState('Tim Dokumentasi Sekolah');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const PRESET_IMAGES = [
    { label: 'Gedung Kampus Hijau', url: '/src/assets/images/hero_school_building_1793685901072.jpg' },
    { label: 'Praktikum Sains & Lab', url: '/src/assets/images/gallery_science_lab_1793685902252.jpg' },
    { label: 'Porseni & Pertandingan Olahraga', url: '/src/assets/images/gallery_sports_field_1793685902636.jpg' },
    { label: 'Upacara Bendera & Paduan Suara', url: '/src/assets/images/gallery_school_ceremony_1793685904022.jpg' },
  ];

  const openAddModal = () => {
    setTitle('');
    setCategory('Akademik');
    setImageUrl(PRESET_IMAGES[0].url);
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setPhotographer('Tim Dokumentasi Sekolah');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    try {
      const itemToSave: GalleryItem = {
        id: `gal-${Date.now()}`,
        title: title.trim(),
        category,
        imageUrl: imageUrl.trim(),
        description: description.trim(),
        date,
        photographer: photographer.trim() || undefined,
      };

      db.saveGalleryItem(itemToSave, token);
      onRefreshData();
      setIsModalOpen(false);
      setToastMsg('Foto dokumentasi baru berhasil diunggah ke galeri sekolah!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan foto galeri');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus foto "${title}"?`)) {
      try {
        db.deleteGalleryItem(id, token);
        onRefreshData();
        setToastMsg('Foto galeri berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus foto');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-rose-600" />
            Kelola Galeri Foto Sekolah
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Unggah dan publikasikan foto dokumentasi kegiatan akademik, ekstrakurikuler, upacara, dan sarana sekolah.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Unggah Foto Baru</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0B192C]/80 text-white">
                {item.category}
              </span>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="absolute top-2.5 right-2.5 p-1.5 rounded bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
                title="Hapus Foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-mono">{item.date}</span>
                {item.photographer && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{item.photographer}</span>
                  </>
                )}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">Unggah Foto Galeri Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul / Keterangan Foto</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Juara 1 Lomba Cerdas Cermat Sains Tingkat Provinsi"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pilih Preset Gambar Beresolusi Tinggi</label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImageUrl(preset.url)}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-colors truncate ${
                        imageUrl === preset.url
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Atau masukkan path / URL gambar"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              {/* Preview */}
              {imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-900 max-h-40">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Seni & Budaya">Seni & Budaya</option>
                    <option value="Upacara">Upacara</option>
                    <option value="Fasilitas">Fasilitas</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kredit Fotografer / Dokumentasi</label>
                <input
                  type="text"
                  value={photographer}
                  onChange={(e) => setPhotographer(e.target.value)}
                  placeholder="Contoh: Jurnalistik OSIS / Humas"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Foto</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan singkat momen yang tertangkap..."
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
                  Simpan ke Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
