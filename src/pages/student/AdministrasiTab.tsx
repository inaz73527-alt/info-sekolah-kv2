import React, { useState } from 'react';
import { AdminService, LetterRequest, User } from '../../types';
import { db } from '../../services/storage';
import {
  FileText,
  Clock,
  Coins,
  Send,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface AdministrasiTabProps {
  services: AdminService[];
  requests: LetterRequest[];
  currentUser: User | null;
  onRefreshData: () => void;
}

export const AdministrasiTab: React.FC<AdministrasiTabProps> = ({
  services,
  requests,
  currentUser,
  onRefreshData,
}) => {
  const [selectedLetterType, setSelectedLetterType] = useState('Surat Keterangan Siswa Aktif');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter requests to show ONLY this student's requests (Security & Privacy Requirement)
  const myRequests = requests.filter(
    (r) => r.studentId === currentUser?.id || r.studentNisn === currentUser?.nisn
  );

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsSubmitting(true);
    const newRequest: LetterRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser?.id || 'std-guest',
      studentName: currentUser?.name || 'Siswa',
      studentNisn: currentUser?.nisn || '0000000000',
      studentClass: currentUser?.classGrade || 'Umum',
      letterType: selectedLetterType,
      reason: reason.trim(),
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Menunggu',
      notes: 'Permohonan berhasil diterima loket TU dan sedang dalam antrean verifikasi.',
    };

    db.submitLetterRequest(newRequest);
    setIsSubmitting(false);
    setReason('');
    setSuccessToast('Permohonan surat berhasil dikirim ke Tata Usaha!');
    onRefreshData();

    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const getStatusBadge = (status: LetterRequest['status']) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Diproses':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Selesai':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Ditolak':
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Informasi Administrasi & Layanan Tata Usaha
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Panduan persyaratan administrasi, informasi pembiayaan/SPP & BOS, serta pengajuan surat resmi sekolah secara daring.
        </p>
      </div>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 2-Column Split: Services Guide vs Online Request Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Admin Services Guide */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-600" />
            Panduan Layanan & Tata Tertib Administrasi
          </h2>

          <div className="space-y-4">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-blue-700">
                      {svc.category}
                    </span>
                    {svc.isDemoData && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        DATA DEMO
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    {svc.cost}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {svc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {svc.description}
                </p>

                {svc.requirements && svc.requirements.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-700">Persyaratan Dokumen:</p>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {svc.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 text-[10px] mt-0.5">&#10003;</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Waktu Proses: {svc.processingTime}
                  </span>
                  <span>Petugas: {svc.contactPerson}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Letter Request Form & Status Tracking */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Online Request Form */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Layanan Mandiri Siswa
              </span>
              <h2 className="text-sm font-bold text-slate-900">
                Formulir Pengajuan Surat Online
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Surat resmi ditandatangani Kepala Sekolah & ber-nomor registrasi.
              </p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-3.5">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pemohon:</span>
                  <span className="font-semibold text-slate-800">{currentUser?.name}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-500">NISN / Kelas:</span>
                  <span className="text-slate-800">{currentUser?.nisn} / {currentUser?.classGrade}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Jenis Surat
                </label>
                <select
                  value={selectedLetterType}
                  onChange={(e) => setSelectedLetterType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white"
                >
                  <option value="Surat Keterangan Siswa Aktif">Surat Keterangan Siswa Aktif</option>
                  <option value="Surat Rekomendasi Beasiswa">Surat Rekomendasi Beasiswa</option>
                  <option value="Surat Keterangan Berkelakuan Baik">Surat Keterangan Berkelakuan Baik</option>
                  <option value="Surat Dispensasi / Izin Lomba">Surat Dispensasi / Izin Lomba</option>
                  <option value="Surat Pengantar Magang / PKL">Surat Pengantar Magang / PKL</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alasan & Tujuan Pengajuan
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Contoh: Keperluan perpanjangan tunjangan dinas ayah di PT KAI / syarat daftar beasiswa BAZNAS..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !reason.trim()}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Permohonan Surat'}
              </button>
            </form>
          </div>

          {/* Student's Request Status History (Private View) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Status Permohonan Surat Saya
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {myRequests.length} Berkas
              </span>
            </div>

            {myRequests.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-3 text-center">
                Anda belum pernah mengajukan permohonan surat.
              </p>
            ) : (
              <div className="space-y-3">
                {myRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {req.letterType}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {req.reason}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Tanggal: {req.requestDate}</span>
                      {req.documentNumber && (
                        <span className="text-blue-700 font-semibold truncate max-w-[150px]">
                          No: {req.documentNumber}
                        </span>
                      )}
                    </div>

                    {req.notes && (
                      <p className="text-[11px] text-blue-900 bg-blue-50/80 p-2 rounded border border-blue-100">
                        <strong>Catatan TU:</strong> {req.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
