import React, { useState, useEffect } from 'react';
import { SchoolContactInfo } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  UserCheck,
  Share2,
} from 'lucide-react';

interface ManageSchoolProfileProps {
  schoolContact: SchoolContactInfo;
  onRefreshData: () => void;
}

export const ManageSchoolProfile: React.FC<ManageSchoolProfileProps> = ({
  schoolContact,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState<SchoolContactInfo>(schoolContact);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(schoolContact);
  }, [schoolContact]);

  const handleChange = (field: keyof SchoolContactInfo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field: keyof SchoolContactInfo['socialMedia'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Nama sekolah tidak boleh kosong.');
      return;
    }

    setIsSubmitting(true);
    try {
      db.saveSchoolContact(formData, token);
      onRefreshData();
      setToastMsg('Informasi profil dan kontak sekolah berhasil diperbarui!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan profil sekolah');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Pengaturan Profil & Kontak Sekolah
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sesuaikan nama resmi sekolah, alamat, kontak WhatsApp, email, kepala sekolah, dan jam operasional.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quick Presets for SMP / MTs */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <span>Pilihan Cepat Jenjang: SMP / MTs</span>
            </h3>
            <p className="text-[11px] text-blue-700 mt-0.5">
              Pilih salah satu preset untuk mengisi nama instansi dan domain SMP atau MTs:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  name: 'SMP Negeri 1 Teladan',
                  institutionType: 'SMP',
                  email: 'info@smpn1teladan.sch.id',
                  website: 'https://smpn1teladan.sch.id',
                }));
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-blue-300 text-blue-900 text-xs font-semibold hover:bg-blue-100/70 transition-colors shadow-2xs"
            >
              Preset SMP Negeri
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  name: 'MTs Negeri 1 Teladan',
                  institutionType: 'MTs',
                  email: 'info@mtsn1teladan.sch.id',
                  website: 'https://mtsn1teladan.sch.id',
                }));
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-2xs"
            >
              Preset MTs Negeri
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  name: 'SMP / MTs Teladan Nusantara',
                  institutionType: 'SMP/MTs',
                  email: 'info@smp-mts-teladan.sch.id',
                  website: 'https://smp-mts-teladan.sch.id',
                }));
              }}
              className="px-3 py-1.5 rounded-lg bg-[#0B192C] text-white text-xs font-semibold hover:bg-slate-900 transition-colors shadow-2xs"
            >
              Preset SMP/MTs Terpadu
            </button>
          </div>
        </div>

        {/* Section 1: Identitas Pokok Sekolah */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-600" />
            Identitas Pokok Sekolah (Jenjang SMP / MTs)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Resmi Sekolah / Madrasah</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Contoh: SMP Negeri 1 Teladan / MTs Negeri 1"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jenjang Institusi</label>
              <select
                value={formData.institutionType || 'SMP'}
                onChange={(e) => handleChange('institutionType', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="SMP">SMP (Sekolah Menengah Pertama - Kemendikbud)</option>
                <option value="MTs">MTs (Madrasah Tsanawiyah - Kemenag)</option>
                <option value="SMP/MTs">SMP / MTs (Terpadu)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Slogan Aplikasi / Sekolah</label>
              <input
                type="text"
                required
                value={formData.slogan}
                onChange={(e) => handleChange('slogan', e.target.value)}
                placeholder="Satu Aplikasi, Semua Informasi Sekolah"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Akreditasi</label>
              <input
                type="text"
                required
                value={formData.accreditation}
                onChange={(e) => handleChange('accreditation', e.target.value)}
                placeholder="A (Unggul) - BAN-SM"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Lokasi & Alamat */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-600" />
            Alamat & Lokasi Sekolah
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Alamat Jalan Lengkap</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Jl. Pendidikan Merdeka No. 45, Kebayoran Baru"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Kota / Kabupaten</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Jakarta Selatan"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Provinsi & Kode Pos</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={formData.province}
                  onChange={(e) => handleChange('province', e.target.value)}
                  placeholder="DKI Jakarta"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder="12130"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Kontak & Jam Layanan */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-600" />
            Kontak Resmi & Jam Operasional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Telepon Kantor</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(021) 7892-4411"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Resmi Humas</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="0812-9876-5432"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Resmi</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="info@sman1teladan.sch.id"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Situs Web</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://sman1teladan.sch.id"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Jam Operasional Layanan Tata Usaha</label>
              <input
                type="text"
                required
                value={formData.operatingHours}
                onChange={(e) => handleChange('operatingHours', e.target.value)}
                placeholder="Senin - Jumat: 06.45 - 16.00 WIB | Sabtu: 07.00 - 13.00 WIB"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Pimpinan Sekolah & Media Sosial */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-slate-600" />
            Kepala Sekolah & Media Sosial
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Kepala Sekolah</label>
              <input
                type="text"
                required
                value={formData.principal}
                onChange={(e) => handleChange('principal', e.target.value)}
                placeholder="Drs. H. Bambang Suryono, M.Pd."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                value={formData.principalNip}
                onChange={(e) => handleChange('principalNip', e.target.value)}
                placeholder="19680512 199303 1 004"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Instagram Resmi</label>
              <input
                type="text"
                value={formData.socialMedia.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="@sman1teladan.official"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">YouTube Resmi</label>
              <input
                type="text"
                value={formData.socialMedia.youtube}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="SMAN 1 Teladan Official TV"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Seluruh Pengaturan Sekolah</span>
          </button>
        </div>
      </form>
    </div>
  );
};
