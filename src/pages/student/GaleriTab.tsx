import React, { useState, useMemo } from 'react';
import { GalleryItem } from '../../types';
import {
  Image as ImageIcon,
  Calendar,
  Camera,
  X,
  Maximize2,
  ChevronRight,
} from 'lucide-react';

interface GaleriTabProps {
  galleryItems: GalleryItem[];
}

export const GaleriTab: React.FC<GaleriTabProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['Semua', 'Fasilitas', 'Akademik', 'Olahraga', 'Upacara', 'Seni & Budaya'];

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      return selectedCategory === 'Semua' || item.category === selectedCategory;
    });
  }, [galleryItems, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              Galeri Dokumentasi Sekolah
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Dokumentasi resmi aktivitas belajar, kejuaraan, fasilitas, dan kegiatan sosial sekolah.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {filteredItems.length} Foto Tersedia
          </span>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-t border-slate-100 pt-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with Fallback */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container in case of error
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                {item.isDemoData && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 backdrop-blur-xs text-white">
                    DEMO
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0B192C]/80 backdrop-blur-xs text-white">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.date}
                </span>
                {item.photographer && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="truncate flex items-center gap-1">
                      <Camera className="w-3 h-3 text-slate-400" />
                      {item.photographer}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-fadeIn">
            <div className="relative aspect-16/9 bg-slate-950 flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto mx-auto object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 bg-white space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{activePhoto.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{activePhoto.date}</span>
                {activePhoto.photographer && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Dokumentasi: {activePhoto.photographer}</span>
                  </>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {activePhoto.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
