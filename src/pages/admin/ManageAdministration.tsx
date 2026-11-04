import React, { useState } from 'react';
import { AdminService, LetterRequest } from '../../types';
import { db } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  FileCheck,
  Building,
  Clock,
  AlertCircle,
  Eye,
  Check,
} from 'lucide-react';

interface ManageAdministrationProps {
  services: AdminService[];
  requests: LetterRequest[];
  onRefreshData: () => void;
}

export const ManageAdministration: React.FC<ManageAdministrationProps> = ({
  services,
  requests,
  onRefreshData,
}) => {
  const { token } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'requests' | 'services'>('requests');

  // Service modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminService | null>(null);
  const [svcTitle, setSvcTitle] = useState('');
  const [svcCategory, setSvcCategory] = useState<AdminService['category']>('Layanan Surat');
  const [svcDesc, setSvcDesc] = useState('');
  const [svcRequirements, setSvcRequirements] = useState('');
  const [svcProcessingTime, setSvcProcessingTime] = useState('1 Hari Kerja');
  const [svcCost, setSvcCost] = useState('Gratis (Rp 0,-)');
  const [svcContact, setSvcContact] = useState('Staf TU');

  // Letter review modal state
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null);
  const [reviewStatus, setReviewStatus] = useState<LetterRequest['status']>('Diproses');
  const [documentNumber, setDocumentNumber] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const openAddServiceModal = () => {
    setEditingService(null);
    setSvcTitle('');
    setSvcCategory('Layanan Surat');
    setSvcDesc('');
    setSvcRequirements('KTP/Kartu Pelajar\nNISN Valid\nBebas Pinjaman Perpus');
    setSvcProcessingTime('1 Hari Kerja');
    setSvcCost('Gratis (Rp 0,-)');
    setSvcContact('Ibu Dra. Endang (TU)');
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (s: AdminService) => {
    setEditingService(s);
    setSvcTitle(s.title);
    setSvcCategory(s.category);
    setSvcDesc(s.description);
    setSvcRequirements((s.requirements || []).join('\n'));
    setSvcProcessingTime(s.processingTime);
    setSvcCost(s.cost);
    setSvcContact(s.contactPerson);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!svcTitle.trim()) return;

    try {
      const requirements = svcRequirements
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const itemToSave: AdminService = {
        id: editingService ? editingService.id : `adm-${Date.now()}`,
        title: svcTitle.trim(),
        category: svcCategory,
        description: svcDesc.trim(),
        requirements,
        processingTime: svcProcessingTime.trim(),
        cost: svcCost.trim(),
        contactPerson: svcContact.trim(),
      };

      db.saveAdminService(itemToSave, token);
      onRefreshData();
      setIsServiceModalOpen(false);
      setToastMsg('Layanan administrasi berhasil diperbarui!');
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan layanan');
    }
  };

  const handleDeleteService = (id: string, title: string) => {
    if (confirm(`Hapus panduan layanan "${title}"?`)) {
      try {
        db.deleteAdminService(id, token);
        onRefreshData();
        setToastMsg('Layanan administrasi berhasil dihapus.');
        setTimeout(() => setToastMsg(null), 3000);
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus layanan');
      }
    }
  };

  const openReviewModal = (req: LetterRequest) => {
    setSelectedRequest(req);
    setReviewStatus(req.status === 'Menunggu' ? 'Diproses' : req.status);
    setDocumentNumber(
      req.documentNumber || `421.3/TU-SMA/XI/2026-${Math.floor(100 + Math.random() * 900)}`
    );
    setReviewNotes(req.notes || 'Dokumen telah diverifikasi dan siap diambil di loket TU.');
  };

  const handleUpdateLetterStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      db.updateLetterRequestStatus(
        selectedRequest.id,
        reviewStatus,
        reviewNotes.trim(),
        reviewStatus === 'Selesai' ? documentNumber.trim() : undefined,
        token
      );
      onRefreshData();
      setSelectedRequest(null);
      setToastMsg(`Status surat berhasil diperbarui menjadi "${reviewStatus}".`);
      setTimeout(() => setToastMsg(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Gagal memperbarui status surat');
    }
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
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Kelola Administrasi & Permohonan Surat Siswa
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tinjau dan proses permohonan surat masuk serta kelola panduan administrasi sekolah.
            </p>
          </div>

          {activeSubTab === 'services' && (
            <button
              onClick={openAddServiceModal}
              className="self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Layanan Baru</span>
            </button>
          )}
        </div>

        {/* Sub-tab selection */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
              activeSubTab === 'requests'
                ? 'bg-[#0B192C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Permohonan Surat Siswa</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white">
              {requests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('services')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
              activeSubTab === 'services'
                ? 'bg-[#0B192C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Panduan Layanan & Tata Tertib</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-700 text-white">
              {services.length}
            </span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* View 1: Letter Requests Management */}
      {activeSubTab === 'requests' && (
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Nama Siswa / NISN</th>
                  <th className="p-3.5">Kelas</th>
                  <th className="p-3.5">Jenis Surat</th>
                  <th className="p-3.5">Alasan / Kebutuhan</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      Belum ada permohonan surat masuk dari siswa.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-mono whitespace-nowrap text-slate-500">
                        {req.requestDate}
                      </td>
                      <td className="p-3.5 font-medium text-slate-900 whitespace-nowrap">
                        <div>{req.studentName}</div>
                        <div className="text-[11px] font-mono text-slate-500">{req.studentNisn}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap font-medium text-slate-700">{req.studentClass}</td>
                      <td className="p-3.5 font-bold text-blue-900 whitespace-nowrap">
                        {req.letterType}
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-xs">
                        <div className="line-clamp-2">{req.reason}</div>
                        {req.documentNumber && (
                          <div className="text-[10px] text-blue-700 font-mono mt-0.5">
                            No. Dokumen: {req.documentNumber}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadge(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => openReviewModal(req)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ml-auto shadow-xs"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Proses Surat</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Administrative Services Guide Management */}
      {activeSubTab === 'services' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-700">{svc.category}</span>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {svc.cost}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{svc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>

                {svc.requirements && (
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600">
                    <p className="font-semibold text-slate-700 mb-1">Persyaratan:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {svc.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Waktu: {svc.processingTime}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditServiceModal(svc)}
                    className="p-1.5 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit Layanan"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(svc.id, svc.title)}
                    className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Review Surat Siswa */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn text-xs">
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Tinjau & Validasi Surat Permohonan Siswa
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Pemohon: <strong className="text-slate-800">{selectedRequest.studentName}</strong> ({selectedRequest.studentClass})
                </p>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateLetterStatus} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Jenis Surat:</span>
                  <span className="font-bold text-blue-900">{selectedRequest.letterType}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-500">NISN Siswa:</span>
                  <span>{selectedRequest.studentNisn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Pengajuan:</span>
                  <span>{selectedRequest.requestDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Alasan Pemohon:</span>
                  <p className="bg-white p-2 rounded border border-slate-200 text-slate-800">
                    {selectedRequest.reason}
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Permohonan</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses (Sedang Dibuat / Disahkan)</option>
                  <option value="Selesai">Selesai (Siap Diambil)</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              {reviewStatus === 'Selesai' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Registrasi Surat Resmi</label>
                  <input
                    type="text"
                    required
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Contoh: 421.3/TU-SMA/XI/2026-092"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan / Instruksi Pengambilan untuk Siswa</label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Contoh: Surat telah ditandatangani Kepala Sekolah. Silakan diambil di meja TU No. 2 pada jam kerja."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-xs"
                >
                  Simpan Status & Kirim Notifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Layanan */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fadeIn text-xs">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-slate-900">
                {editingService ? 'Edit Layanan Administrasi' : 'Tambah Layanan Administrasi Baru'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-5 space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Layanan / Prosedur</label>
                <input
                  type="text"
                  required
                  value={svcTitle}
                  onChange={(e) => setSvcTitle(e.target.value)}
                  placeholder="Contoh: Surat Keterangan Siswa Aktif Belajar"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={svcCategory}
                    onChange={(e) => setSvcCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Layanan Surat">Layanan Surat</option>
                    <option value="Keuangan & SPP">Keuangan & SPP</option>
                    <option value="Bantuan & Beasiswa">Bantuan & Beasiswa</option>
                    <option value="Tata Tertib">Tata Tertib</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Biaya / Tarif</label>
                  <input
                    type="text"
                    required
                    value={svcCost}
                    onChange={(e) => setSvcCost(e.target.value)}
                    placeholder="Gratis (Rp 0,-)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu Penyelesaian</label>
                  <input
                    type="text"
                    required
                    value={svcProcessingTime}
                    onChange={(e) => setSvcProcessingTime(e.target.value)}
                    placeholder="1 Hari Kerja"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penanggung Jawab / Loket</label>
                  <input
                    type="text"
                    required
                    value={svcContact}
                    onChange={(e) => setSvcContact(e.target.value)}
                    placeholder="Ibu Endang (Loket TU 2)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi & Tujuan Layanan</label>
                <textarea
                  rows={2}
                  value={svcDesc}
                  onChange={(e) => setSvcDesc(e.target.value)}
                  placeholder="Keterangan kegunaan layanan..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Persyaratan Dokumen (Pisahkan per baris)
                </label>
                <textarea
                  rows={3}
                  value={svcRequirements}
                  onChange={(e) => setSvcRequirements(e.target.value)}
                  placeholder="Siswa terdaftar aktif&#10;NISN Valid&#10;Kartu Pelajar"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-xs"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
