import React, { useState, useMemo } from 'react';
import { Announcement } from '../../types';
import {
  Search,
  Bell,
  Download,
  Calendar,
  User,
  Tag,
  Paperclip,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';

interface PengumumanTabProps {
  announcements: Announcement[];
  selectedAnnouncement: Announcement | null;
  onSelectAnnouncement: (ann: Announcement | null) => void;
}

export const PengumumanTab: React.FC<PengumumanTabProps> = ({
  announcements,
  selectedAnnouncement,
  onSelectAnnouncement,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories = ['Semua', 'Akademik', 'Kesiswaan', 'Sarana', 'Libur', 'Umum'];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((ann) => {
      const matchSearch =
        ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'Semua' || ann.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [announcements, searchQuery, selectedCategory]);

  const handleDownloadAttachment = (ann: Announcement) => {
    if (!ann.attachmentName) return;
    setDownloadSuccessToast(`Mengunduh file: ${ann.attachmentName}`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Papan Pengumuman Sekolah
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Informasi resmi dari Kepala Sekolah, Kurikulum, Kesiswaan, dan Tata Usaha.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {filteredAnnouncements.length} Pengumuman
          </span>
        </div>

        {/* Search input & Category tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengumuman berdasarkan judul, isi, atau pembuat..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B192C] text-white px-4 py-3 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs animate-slideUp">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Announcements List */}
      {filteredAnnouncements.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">Tidak ada pengumuman ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Tidak ada edaran yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo; atau filter kategori yang dipilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="mt-4 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              onClick={() => onSelectAnnouncement(ann)}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-blue-300 p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="font-semibold text-blue-700">{ann.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {ann.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {ann.author}
                  </span>
                  {ann.isPinned && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700 font-semibold">Tersemat Penting</span>
                    </>
                  )}
                </div>

                {ann.attachmentName && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    <Paperclip className="w-3 h-3 text-slate-400" />
                    {ann.attachmentSize || 'Lampiran'}
                  </span>
                )}
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {ann.title}
              </h2>

              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {ann.content}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:underline">
                  Klik untuk membaca selengkapnya &rarr;
                </span>
                {ann.attachmentName && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadAttachment(ann);
                    }}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Unduh Lampiran</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 flex-wrap">
                  <span className="font-semibold text-blue-700">{selectedAnnouncement.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{selectedAnnouncement.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>Oleh: {selectedAnnouncement.author}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => onSelectAnnouncement(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedAnnouncement.content}
              </div>

              {selectedAnnouncement.attachmentName && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Paperclip className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedAnnouncement.attachmentName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Ukuran berkas: {selectedAnnouncement.attachmentSize || 'Dokumen Resmi'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadAttachment(selectedAnnouncement)}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={() => onSelectAnnouncement(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
