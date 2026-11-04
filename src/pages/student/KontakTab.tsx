import React, { useState } from 'react';
import { SchoolContactInfo } from '../../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  MessageSquare,
  Send,
  CheckCircle2,
  Building,
  ExternalLink,
} from 'lucide-react';

interface KontakTabProps {
  schoolContact: SchoolContactInfo;
}

export const KontakTab: React.FC<KontakTabProps> = ({ schoolContact }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedToast(true);
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => {
        setSubmittedToast(false);
      }, 5000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-600" />
          Kontak & Layanan Hubungan Masyarakat (Humas)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Saluran komunikasi resmi bagi siswa, orang tua/wali murid, alumni, dan masyarakat umum.
        </p>
      </div>

      {submittedToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Terima kasih! Pesan Anda telah terkirim ke bagian Humas sekolah dan akan ditanggapi segera.</span>
        </div>
      )}

      {/* 2-Column Split: Contact Information vs Send Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Contact Cards & Campus Location */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Main Info Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                Madrasah Tsanawiyah Negeri Unggulan
              </span>
              <h2 className="text-lg font-bold text-slate-900">{schoolContact.name}</h2>
              <p className="text-xs text-slate-500">Terakreditasi {schoolContact.accreditation}</p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Alamat Sekolah</p>
                  <p className="text-slate-600">{schoolContact.address}, {schoolContact.city}, {schoolContact.province} {schoolContact.postalCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Telepon Kantor & WhatsApp</p>
                  <p className="font-mono text-slate-600">{schoolContact.phone}</p>
                  <p className="font-mono text-emerald-700 font-semibold">WA Humas: {schoolContact.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Surat Elektronik (Email Resmi)</p>
                  <p className="font-mono text-blue-700">{schoolContact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Jam Layanan Kantor</p>
                  <p className="text-slate-600">{schoolContact.operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-800 mb-2">Media Sosial Resmi:</p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                  IG: {schoolContact.socialMedia.instagram}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                  YT: {schoolContact.socialMedia.youtube}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Representation */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-600" />
                Lokasi Geografis & Denah Kampus
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Rumbia Tengah, Bombana</span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-48 flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-900">MTsN 2 Bombana</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Jl. Sultan Hasanuddin, Kelurahan Lauru, Kecamatan Rumbia Tengah, Kabupaten Bombana, Sulawesi Tenggara.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Send Message / Feedback Form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                Formulir Kontak
              </span>
              <h2 className="text-lg font-bold text-slate-900">Hubungi Kami / Layanan Pengaduan</h2>
              <p className="text-xs text-slate-500">
                Kirimkan pertanyaan, saran, atau konfirmasi terkait administrasi sekolah.
              </p>
            </div>

            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nama Lengkap Pemohon
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Budi Prasetyo / Orang Tua Siswa"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Alamat Email / Nomor WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="email@contoh.com atau 0812xxxx"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Kategori Pesan / Subjek
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Pertanyaan Legalisir Ijazah / Jadwal Ujian"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Isi Pesan / Pertanyaan
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pesan Anda secara jelas dan santun..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Mengirimkan Pesan...' : 'Kirim Pesan ke Humas'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
