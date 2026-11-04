export type UserRole = 'admin' | 'siswa';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nisn?: string;
  classGrade?: string;
  phone?: string;
  avatar?: string;
  status?: 'Aktif' | 'Nonaktif' | 'Alumni';
  joinedYear?: number;
  gender?: 'L' | 'P';
  pin?: string;
  isDemoData?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Akademik' | 'Kesiswaan' | 'Sarana' | 'Libur' | 'Umum';
  content: string;
  date: string;
  author: string;
  isPinned?: boolean;
  priority: 'Tinggi' | 'Normal' | 'Penting';
  attachmentName?: string;
  attachmentSize?: string;
  isDemoData?: boolean;
}

export interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  semester: 'Ganjil' | 'Genap';
  category: 'Ujian' | 'Libur' | 'Kegiatan' | 'Administrasi';
  description: string;
  location?: string;
  isDemoData?: boolean;
}

export interface ActivitySchedule {
  id: string;
  title: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  time: string;
  location: string;
  category: 'Rutin' | 'Khusus' | 'Lomba' | 'Pembinaan';
  targetAudience: string;
  organizer: string;
  description: string;
  isDemoData?: boolean;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: 'Keagamaan' | 'Kepemimpinan' | 'Olahraga' | 'Seni & Budaya' | 'Akademik' | 'Sains & Teknologi' | 'Kemanusiaan';
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  timeSlot?: string;
  location: string;
  description: string;
  instructor?: string;
  schedule?: string;
  memberCount?: number;
  maxCapacity?: number;
  achievements?: string[];
  contactPerson?: string;
  isDemoData?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'Akademik' | 'Olahraga' | 'Seni & Budaya' | 'Upacara' | 'Fasilitas';
  imageUrl: string;
  date: string;
  photographer?: string;
  isDemoData?: boolean;
}

export interface AdminService {
  id: string;
  title: string;
  category: 'Layanan Surat' | 'Keuangan & SPP' | 'Bantuan & Beasiswa' | 'Tata Tertib';
  description: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  contactPerson: string;
  isDemoData?: boolean;
}

export interface LetterRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentNisn: string;
  studentClass: string;
  letterType: string;
  reason: string;
  requestDate: string;
  status: 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';
  notes?: string;
  documentNumber?: string;
}

export interface SchoolContactInfo {
  name: string;
  slogan: string;
  npsn: string;
  accreditation: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  principal: string;
  principalNip: string;
  operatingHours: string;
  institutionType?: 'SMP' | 'MTs' | 'SMP/MTs';
  socialMedia: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}
