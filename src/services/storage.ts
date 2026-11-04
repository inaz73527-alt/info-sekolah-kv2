import {
  AcademicEvent,
  ActivitySchedule,
  AdminService,
  Announcement,
  Extracurricular,
  GalleryItem,
  LetterRequest,
  SchoolContactInfo,
  User,
  UserRole,
} from '../types';

const STORAGE_KEYS = {
  ANNOUNCEMENTS: 'infosekolah_announcements_v4',
  CALENDAR: 'infosekolah_calendar_v4',
  ACTIVITIES: 'infosekolah_activities_v4',
  EXTRACURRICULARS: 'infosekolah_ekskul_v4',
  GALLERY: 'infosekolah_gallery_v4',
  ADMIN_SERVICES: 'infosekolah_admin_services_v4',
  LETTER_REQUESTS: 'infosekolah_letter_requests_v4',
  STUDENTS: 'infosekolah_students_v4',
  CONTACT: 'infosekolah_contact_v4',
  CURRENT_USER: 'infosekolah_current_user_v4',
  AUTH_TOKEN: 'infosekolah_auth_token_v4',
};

// Seed Data
export const INITIAL_CONTACT_INFO: SchoolContactInfo = {
  name: 'MTsN 2 Bombana',
  slogan: 'Satu Aplikasi, Semua Informasi Sekolah',
  npsn: '',
  accreditation: 'A (Unggul) - Kemenag',
  address: 'Jl. Sultan Hasanuddin, Kelurahan Lauru, Kecamatan Rumbia Tengah',
  city: 'Kabupaten Bombana',
  province: 'Sulawesi Tenggara',
  postalCode: '93771',
  phone: '(0401) 321-456',
  whatsapp: '0812-4567-8901',
  email: 'info@mtsn2bombana.sch.id',
  website: 'https://mtsn2bombana.sch.id',
  principal: 'Drs. H. Mansur, M.Pd.I.',
  principalNip: '19700315 199603 1 002',
  operatingHours: 'Senin - Kamis & Sabtu: 06.45 - 12.50 WITA | Jum\'at: 06.45 - 11.00 WITA',
  institutionType: 'MTs',
  socialMedia: {
    instagram: '@mtsn2bombana.official',
    youtube: 'MTsN 2 Bombana Official',
    facebook: 'MTs Negeri 2 Bombana',
  },
};

export const INITIAL_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Budi Santoso, S.Kom. (Administrator)',
    email: 'admin@infosekolah.sch.id',
    role: 'admin',
    phone: '0811-2345-6789',
    status: 'Aktif',
    pin: 'infosekolahmtsn2bombana12321',
  },
  {
    id: 'admin-2',
    name: 'Dra. Endang Purwaningsih (Staf TU MTsN 2 Bombana)',
    email: 'tu@mtsn2bombana.sch.id',
    role: 'admin',
    phone: '0812-3456-7890',
    status: 'Aktif',
    pin: 'infosekolahmtsn2bombana12321',
  },
  {
    id: 'std-1',
    name: 'Ahmad Fauzi Rahman',
    email: 'fauzi.rahman@siswa.sch.id',
    role: 'siswa',
    nisn: '0068492011',
    classGrade: 'IX-A (Kelas 9A)',
    phone: '0857-1234-5678',
    status: 'Aktif',
    joinedYear: 2024,
    gender: 'L',
    pin: '123456',
  },
  {
    id: 'std-2',
    name: 'Siti Nurhaliza Putri',
    email: 'siti.nurhaliza@siswa.sch.id',
    role: 'siswa',
    nisn: '0071239845',
    classGrade: 'VIII-B (Kelas 8B)',
    phone: '0878-9876-5432',
    status: 'Aktif',
    joinedYear: 2025,
    gender: 'P',
    pin: '123456',
  },
  {
    id: 'std-3',
    name: 'Muh. Fadhil Ardiansyah',
    email: 'fadhil.ardiansyah@siswa.sch.id',
    role: 'siswa',
    nisn: '0069384722',
    classGrade: 'IX-B (Kelas 9B)',
    phone: '0813-8822-1100',
    status: 'Aktif',
    joinedYear: 2024,
    gender: 'L',
    pin: '123456',
  },
  {
    id: 'std-4',
    name: 'Dewi Ayu Anjani',
    email: 'dewi.anjani@siswa.sch.id',
    role: 'siswa',
    nisn: '0082910394',
    classGrade: 'VII-A (Kelas 7A)',
    phone: '0821-4455-6677',
    status: 'Aktif',
    joinedYear: 2026,
    gender: 'P',
    pin: '123456',
  },
  {
    id: 'std-5',
    name: 'Rizky Pratama Yudha',
    email: 'rizky.pratama@siswa.sch.id',
    role: 'siswa',
    nisn: '0074829103',
    classGrade: 'VIII-A (Kelas 8A)',
    phone: '0896-7788-9900',
    status: 'Aktif',
    joinedYear: 2025,
    gender: 'L',
    pin: '123456',
  },
  {
    id: 'std-6',
    name: 'Nurul Annisa',
    email: 'nurul.annisa@siswa.sch.id',
    role: 'siswa',
    nisn: '0089123456',
    classGrade: 'VII-C (Kelas 7C)',
    phone: '0812-9900-1122',
    status: 'Aktif',
    joinedYear: 2026,
    gender: 'P',
    pin: '123456',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Edaran Pelaksanaan Upacara Bendera Hari Senin & Disiplin Jam Masuk KBM 07.35 WITA',
    category: 'Kesiswaan',
    content:
      'Diberitahukan kepada seluruh siswa-siswi MTsN 2 Bombana bahwa pelaksanaan upacara bendera hari Senin dimulai tepat pukul 07.00 - 07.30 WITA di lapangan utama madrasah. Jam masuk kelas dimulai tepat pukul 07.35 WITA. Seluruh peserta didik wajib mengenakan seragam madrasah lengkap, atribut dasi, serta peci/jilbab rapi.',
    date: '2026-11-03',
    author: 'Wakamad Bidang Kesiswaan',
    isPinned: true,
    priority: 'Penting',
    attachmentName: 'Edaran_Tata_Tertib_Upacara_MTsN2.pdf',
    attachmentSize: '1.1 MB',
  },
  {
    id: 'ann-2',
    title: 'Jadwal Pelaksanaan Apel Pagi (Selasa - Sabtu) dan Senam Bersama Hari Jum\'at',
    category: 'Kesiswaan',
    content:
      'Pelaksanaan apel pagi MTsN 2 Bombana diselenggarakan setiap hari Selasa sampai dengan Sabtu pukul 06.45 - 07.00 WITA. Khusus hari Jum\'at pagi, setelah apel pagi langsung dilanjutkan kegiatan Senam Jasmani Sehat Bersama seluruh dewan guru dan siswa hingga pukul 07.30 WITA, dan KBM dimulai pukul 07.30 WITA.',
    date: '2026-11-02',
    author: 'Pembina OSIS & Guru Piket',
    isPinned: true,
    priority: 'Normal',
    attachmentName: 'Panduan_Apel_dan_Senam_Madrasah.pdf',
    attachmentSize: '850 KB',
  },
  {
    id: 'ann-3',
    title: 'Jadwal Resmi Kegiatan Sore Ekstrakurikuler MTsN 2 Bombana TA 2026/2027',
    category: 'Kesiswaan',
    content:
      'Daftar jadwal kegiatan sore ekstrakurikuler MTsN 2 Bombana: Senin (Les Bahasa Inggris & Paskibraka/PBB), Selasa (Pramuka), Rabu (Tari & Tahfiz), Kamis (Marching Band), Jum\'at (Liga Madrasah & Sholawat), Sabtu (Marching Band & Latihan Upacara untuk hari Senin). Seluruh peserta didik diimbau mengikuti kegiatan sore dengan tertib.',
    date: '2026-11-01',
    author: 'Koordinator Ekstrakurikuler',
    isPinned: true,
    priority: 'Tinggi',
  },
  {
    id: 'ann-4',
    title: 'Penetapan Jam Pulang Sekolah: Reguler 12.50 WITA & Khusus Jum\'at 11.00 WITA',
    category: 'Umum',
    content:
      'Berdasarkan tata tertib KBM MTsN 2 Bombana, jam kepulangan siswa pada hari Senin s.d. Sabtu adalah pukul 12.50 WITA, kecuali pada hari Jum\'at pulang pukul 11.00 WITA guna persiapan ibadah Sholat Jum\'at berjamaah.',
    date: '2026-10-30',
    author: 'Kepala MTsN 2 Bombana',
    isPinned: false,
    priority: 'Normal',
  },
  {
    id: 'ann-5',
    title: 'Persiapan Pelaksanaan Asesmen Madrasah Semester Ganjil TA 2026/2027',
    category: 'Akademik',
    content:
      'Seluruh peserta didik kelas VII, VIII, dan IX diharapkan menjaga kesehatan dan mempersiapkan materi pembelajaran guna menghadapi Asesmen Madrasah Semester Ganjil. Jadwal pelaksanaan teknis dan kartu ujian akan dikoordinasikan melalui wali kelas masing-masing.',
    date: '2026-10-25',
    author: 'Wakamad Bidang Kurikulum',
    isPinned: false,
    priority: 'Penting',
  },
];

export const INITIAL_CALENDAR_EVENTS: AcademicEvent[] = [
  {
    id: 'cal-1',
    title: 'Asesmen Sumatif Madrasah Semester Ganjil (CBT)',
    startDate: '2026-11-23',
    endDate: '2026-11-30',
    semester: 'Ganjil',
    category: 'Ujian',
    description: 'Ujian komprehensif penentu capaian belajar semester ganjil berbasis Computer-Based Testing.',
    location: 'Laboratorium Komputer MTsN 2 Bombana',
  },
  {
    id: 'cal-2',
    title: 'Peringatan Hari Guru Nasional & Upacara Apresiasi Guru',
    startDate: '2026-11-25',
    endDate: '2026-11-25',
    semester: 'Ganjil',
    category: 'Kegiatan',
    description: 'Upacara bendera peringatan Hari Guru Nasional dan pemberian apresiasi guru teladan madrasah.',
    location: 'Lapangan Upacara MTsN 2 Bombana',
  },
  {
    id: 'cal-3',
    title: 'Pekan Olahraga & Seni Madrasah (PORSENI) Antarkelas',
    startDate: '2026-12-14',
    endDate: '2026-12-17',
    semester: 'Ganjil',
    category: 'Kegiatan',
    description: 'Kompetisi futsal, bola voli, bulutangkis antarkelas, cerdas cermat keagamaan, serta tahfiz Al-Qur\'an.',
    location: 'Area Olahraga & Aula Madrasah',
  },
  {
    id: 'cal-4',
    title: 'Penyerahan Laporan Hasil Belajar (Rapor Digital Madrasah - RDM)',
    startDate: '2026-12-19',
    endDate: '2026-12-19',
    semester: 'Ganjil',
    category: 'Administrasi',
    description: 'Penyerahan buku rapor digital semester ganjil langsung kepada orang tua / wali peserta didik.',
    location: 'Ruang Kelas Masing-masing',
  },
  {
    id: 'cal-5',
    title: 'Libur Akhir Semester Ganjil & Tahun Baru 2027',
    startDate: '2026-12-21',
    endDate: '2027-01-03',
    semester: 'Ganjil',
    category: 'Libur',
    description: 'Masa libur semester ganjil untuk seluruh siswa-siswi MTsN 2 Bombana.',
  },
  {
    id: 'cal-6',
    title: 'Hari Pertama Masuk KBM Semester Genap TA 2026/2027',
    startDate: '2027-01-04',
    endDate: '2027-01-04',
    semester: 'Genap',
    category: 'Kegiatan',
    description: 'Apel pembukaan semester baru dan dimulainya KBM efektif semester genap.',
    location: 'Lapangan Upacara MTsN 2 Bombana',
  },
];

export const INITIAL_ACTIVITIES: ActivitySchedule[] = [
  {
    id: 'act-upacara-senin',
    title: 'Upacara Bendera Hari Senin',
    day: 'Senin',
    time: '07.00 - 07.30',
    location: 'Lapangan Upacara MTsN 2 Bombana',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa, Guru & Tenaga Kependidikan',
    organizer: 'Petugas Upacara & Kesiswaan',
    description: 'Pelaksanaan upacara pengibaran bendera merah putih rutin setiap Senin pagi.',
  },
  {
    id: 'act-masuk-senin',
    title: 'Jam Masuk Kelas Hari Senin',
    day: 'Senin',
    time: '07.35',
    location: 'Ruang Kelas Masing-masing',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa Kelas VII, VIII, IX',
    organizer: 'Wali Kelas & Guru Pengajar Jam Ke-1',
    description: 'Bel masuk kelas dan KBM dimulai tepat pukul 07.35 setelah upacara bendera selesai.',
  },
  {
    id: 'act-apel-selasa-sabtu',
    title: 'Apel Pagi (Selasa - Sabtu)',
    day: 'Selasa',
    time: '06.45 - 07.00',
    location: 'Halaman MTsN 2 Bombana',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa dan Dewan Guru',
    organizer: 'Guru Piket & OSIS',
    description: 'Apel pagi pembinaan kedisiplinan dan doa bersama sebelum KBM dimulai (Selasa s.d. Sabtu).',
  },
  {
    id: 'act-masuk-reguler',
    title: 'Jam Masuk Kelas Reguler (Selasa, Rabu, Kamis, Sabtu)',
    day: 'Selasa',
    time: '07.00',
    location: 'Ruang Kelas Masing-masing',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa',
    organizer: 'Guru Mapel Jam Pertama',
    description: 'Bel masuk kelas jam 07.00 tepat setelah apel pagi pada hari Selasa, Rabu, Kamis, dan Sabtu.',
  },
  {
    id: 'act-senam-jumat',
    title: 'Senam Jum\'at Pagi (Setelah Apel Pagi)',
    day: 'Jumat',
    time: 'Setelah Apel Pagi (07.00 - 07.30)',
    location: 'Lapangan Madrasah',
    category: 'Rutin',
    targetAudience: 'Seluruh Warga Madrasah',
    organizer: 'Guru Olahraga & OSIS',
    description: 'Kegiatan senam kebugaran jasmani bersama setiap hari Jum\'at langsung setelah apel pagi (06.45 - 07.00).',
  },
  {
    id: 'act-masuk-jumat',
    title: 'Jam Masuk Kelas Hari Jum\'at',
    day: 'Jumat',
    time: '07.30',
    location: 'Ruang Kelas Masing-masing',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa',
    organizer: 'Guru Mapel Jam Pertama',
    description: 'Bel masuk kelas dan KBM hari Jum\'at dimulai pukul 07.30 setelah senam pagi bersama.',
  },
  {
    id: 'act-pulang-jumat',
    title: 'Jam Pulang Hari Jum\'at',
    day: 'Jumat',
    time: '11.00',
    location: 'MTsN 2 Bombana',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa',
    organizer: 'Piket Madrasah',
    description: 'Jam kepulangan khusus hari Jum\'at pada pukul 11.00 untuk persiapan ibadah sholat Jum\'at.',
  },
  {
    id: 'act-pulang-reguler',
    title: 'Jam Pulang Sekolah (Senin - Sabtu, kecuali Jum\'at)',
    day: 'Senin',
    time: '12.50',
    location: 'MTsN 2 Bombana',
    category: 'Rutin',
    targetAudience: 'Seluruh Siswa',
    organizer: 'Piket Madrasah',
    description: 'Jam pulang sekolah reguler hari Senin sampai Sabtu pukul 12.50 (kecuali hari Jum\'at jam 11.00).',
  },
];

export const INITIAL_EXTRACURRICULARS: Extracurricular[] = [
  {
    id: 'eks-les-inggris',
    name: 'Les Bahasa Inggris',
    day: 'Senin',
    timeSlot: 'Kegiatan Sore',
    category: 'Akademik',
    location: '',
    description: '',
  },
  {
    id: 'eks-paskibraka',
    name: 'Paskibraka/PBB',
    day: 'Senin',
    timeSlot: 'Kegiatan Sore',
    category: 'Kepemimpinan',
    location: '',
    description: '',
  },
  {
    id: 'eks-pramuka',
    name: 'Pramuka',
    day: 'Selasa',
    timeSlot: 'Kegiatan Sore',
    category: 'Kepemimpinan',
    location: '',
    description: '',
  },
  {
    id: 'eks-tari',
    name: 'Tari',
    day: 'Rabu',
    timeSlot: 'Kegiatan Sore',
    category: 'Seni & Budaya',
    location: '',
    description: '',
  },
  {
    id: 'eks-tahfiz',
    name: 'Tahfiz',
    day: 'Rabu',
    timeSlot: 'Kegiatan Sore',
    category: 'Keagamaan',
    location: '',
    description: '',
  },
  {
    id: 'eks-marching-kamis',
    name: 'Marching Band',
    day: 'Kamis',
    timeSlot: 'Kegiatan Sore',
    category: 'Seni & Budaya',
    location: '',
    description: '',
  },
  {
    id: 'eks-liga-madrasah',
    name: 'Liga Madrasah',
    day: 'Jumat',
    timeSlot: 'Kegiatan Sore',
    category: 'Olahraga',
    location: '',
    description: '',
  },
  {
    id: 'eks-sholawat',
    name: 'Sholawat',
    day: 'Jumat',
    timeSlot: 'Kegiatan Sore',
    category: 'Keagamaan',
    location: '',
    description: '',
  },
  {
    id: 'eks-marching-sabtu',
    name: 'Marching Band',
    day: 'Sabtu',
    timeSlot: 'Kegiatan Sore',
    category: 'Seni & Budaya',
    location: '',
    description: '',
  },
  {
    id: 'eks-latihan-upacara-sabtu',
    name: 'Latihan Upacara untuk hari Senin',
    day: 'Sabtu',
    timeSlot: 'Kegiatan Sore',
    category: 'Kepemimpinan',
    location: '',
    description: '',
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gedung Utama dan Lingkungan Ramah Anak SMP / MTs Teladan',
    description: 'Lingkungan belajar ramah anak, asri, dan berwawasan masa depan dengan fasilitas modern.',
    category: 'Fasilitas',
    imageUrl: '/src/assets/images/hero_school_building_1793685901072.jpg',
    date: '2026-10-15',
    photographer: 'Tim Dokumentasi Sekolah',
    isDemoData: true,
  },
  {
    id: 'gal-2',
    title: 'Praktikum IPA Terpadu (Fisika & Biologi) di Laboratorium Sains',
    description: 'Peserta didik antusias mengamati mikroorganisme dan hukum optik didampingi guru pembina.',
    category: 'Akademik',
    imageUrl: '/src/assets/images/gallery_science_lab_1793685902252.jpg',
    date: '2026-10-20',
    photographer: 'Pak Irfan Maulana',
    isDemoData: true,
  },
  {
    id: 'gal-3',
    title: 'Pekan Olahraga Antar-Kelas: Pertandingan Sengit Final Bola Basket',
    description: 'Sorak suporter antusias membakar semangat atlet muda di lapangan olahraga kebanggaan sekolah.',
    category: 'Olahraga',
    imageUrl: '/src/assets/images/gallery_sports_field_1793685902636.jpg',
    date: '2026-10-24',
    photographer: 'Jurnalistik OSIS',
    isDemoData: true,
  },
  {
    id: 'gal-4',
    title: 'Upacara Khusus Peringatan Hari Sumpah Pemuda & Gelar Budaya',
    description: 'Kirab bendera merah putih dan penampilan paduan suara membawakan lagu-lagu perjuangan nusantara.',
    category: 'Upacara',
    imageUrl: '/src/assets/images/gallery_school_ceremony_1793685904022.jpg',
    date: '2026-10-28',
    photographer: 'Biro Humas & Protokoler',
    isDemoData: true,
  },
];

export const INITIAL_ADMIN_SERVICES: AdminService[] = [
  {
    id: 'adm-1',
    title: 'Surat Keterangan Siswa Aktif Belajar',
    category: 'Layanan Surat',
    description: 'Dibutuhkan untuk tunjangan gaji orang tua (PNS/TNI/Polri/BUMN/Swasta), kepengurusan BPJS Kesehatan, atau syarat pendaftaran beasiswa.',
    requirements: [
      'Siswa tercatat aktif di semester berjalan',
      'Melampirkan Kartu Pelajar atau NISN valid',
      'Mengisi formulir permohonan surat melalui aplikasi INFOSEKOLAH',
      'Tidak memiliki tunggakan peminjaman buku perpustakaan',
    ],
    processingTime: '1 Hari Kerja (Bisa unduh file PDF atau ambil fisik)',
    cost: 'Gratis (Rp 0,-)',
    contactPerson: 'Ibu Dra. Endang (Staf TU Bagian Kesiswaan)',
    isDemoData: true,
  },
  {
    id: 'adm-2',
    title: 'Legalisir Dokumen Ijazah, Rapor & Sertifikat Akreditasi',
    category: 'Layanan Surat',
    description: 'Pelayanan cap basah dan tanda tangan kepala sekolah untuk dokumen resmi pendaftaran jenjang lanjutan (SMA/SMK/MA).',
    requirements: [
      'Membawa dokumen asli untuk diverifikasi petugas TU',
      'Maksimal 10 lembar fotokopi berkualitas bersih per pemohon',
      'Bagi alumni wajib menunjukkan bukti bebas tanggungan sekolah',
    ],
    processingTime: '1 - 2 Hari Kerja',
    cost: 'Gratis (Rp 0,-)',
    contactPerson: 'Pak Hendro (Front Office TU)',
    isDemoData: true,
  },
  {
    id: 'adm-3',
    title: 'Informasi Sumbangan Pembinaan Pendidikan (SPP) & BOS',
    category: 'Keuangan & SPP',
    description: 'Sesuai regulasi & Petunjuk Teknis Dana BOS, pendidikan reguler tidak dipungut SPP. Kegiatan sukarela dikelola Komite Sekolah secara transparan.',
    requirements: [
      'Seluruh biaya operasional reguler dicover pemerintah melalui Bantuan Operasional Sekolah (BOS)',
      'Program penunjang keunggulan dikelola Komite Sekolah berdasarkan musyawarah mufakat',
      'Laporan keuangan komite diumumkan setiap triwulan',
    ],
    processingTime: 'Setiap jam kerja TU Keuangan',
    cost: 'Sesuai Musyawarah Komite',
    contactPerson: 'Bendahara Sekolah (Pak Ahmad Syarif, SE)',
    isDemoData: true,
  },
  {
    id: 'adm-4',
    title: 'Pengajuan Program Indonesia Pintar (PIP) & Bantuan Khusus',
    category: 'Bantuan & Beasiswa',
    description: 'Fasilitasi bantuan tunai bagi peserta didik dari keluarga pemegang KIP/KKS/PKH untuk menunjang perlengkapan sekolah dan transportasi.',
    requirements: [
      'Fotokopi Kartu Indonesia Pintar (KIP) atau Kartu Keluarga Sejahtera (KKS)',
      'Fotokopi Kartu Keluarga (KK) dan Akta Kelahiran Siswa',
      'Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan bagi yang belum ber-KIP',
      'Status data telah sinkron pada sistem Dapodik / EMIS',
    ],
    processingTime: 'Sesuai jadwal kuota Dapodik / EMIS',
    cost: 'Gratis (Rp 0,-)',
    contactPerson: 'Koordinator PIP Sekolah (Ibu Ratna Dewi, S.Pd.)',
    isDemoData: true,
  },
];

export const INITIAL_LETTER_REQUESTS: LetterRequest[] = [
  {
    id: 'req-1',
    studentId: 'std-1',
    studentName: 'Ahmad Fauzi Rahman',
    studentNisn: '0068492011',
    studentClass: 'IX-A (Kelas 9A)',
    letterType: 'Surat Keterangan Siswa Aktif',
    reason: 'Keperluan tunjangan anak pada kantor instansi orang tua (PT Taspen)',
    requestDate: '2026-11-01',
    status: 'Selesai',
    notes: 'Surat telah ditandatangani dan siap diambil di meja TU No. 2',
    documentNumber: '421.3/TU-SMP/XI/2026-089',
  },
  {
    id: 'req-2',
    studentId: 'std-2',
    studentName: 'Siti Nurhaliza Putri',
    studentNisn: '0071239845',
    studentClass: 'VIII-B (Kelas 8B)',
    letterType: 'Surat Rekomendasi Beasiswa',
    reason: 'Persyaratan berkas seleksi Beasiswa Prestasi Unggulan Daerah',
    requestDate: '2026-11-02',
    status: 'Diproses',
    notes: 'Sedang menunggu pengesahan Kepala Sekolah',
  },
];

// Helper to check admin access authorization
export function verifyAdminAccess(token: string | null): boolean {
  if (!token) return false;
  try {
    const parsed = JSON.parse(atob(token));
    return parsed.role === 'admin';
  } catch {
    return false;
  }
}

// Storage Manager Class
class StorageManager {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultVal;
      return JSON.parse(data) as T;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      // Dispatch storage event so other tabs/listeners sync
      window.dispatchEvent(new Event('infosekolah_db_updated'));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // Auth & Session
  getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      this.set(STORAGE_KEYS.CURRENT_USER, user);
      // Create a simulated cryptographically signed token for RBAC enforcement
      const tokenPayload = {
        sub: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        iat: Date.now(),
      };
      this.set(STORAGE_KEYS.AUTH_TOKEN, btoa(JSON.stringify(tokenPayload)));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      window.dispatchEvent(new Event('infosekolah_db_updated'));
    }
  }

  getAuthToken(): string | null {
    return this.get<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
  }

  // Announcements
  getAnnouncements(): Announcement[] {
    return this.get<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  saveAnnouncement(announcement: Announcement, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menambah atau mengubah pengumuman.');
    }
    const itemToSave: Announcement = { ...announcement, isDemoData: false };
    const list = this.getAnnouncements();
    const index = list.findIndex((a) => a.id === itemToSave.id);
    if (index >= 0) {
      list[index] = itemToSave;
    } else {
      list.unshift(itemToSave);
    }
    this.set(STORAGE_KEYS.ANNOUNCEMENTS, list);
  }

  deleteAnnouncement(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus pengumuman.');
    }
    const list = this.getAnnouncements().filter((a) => a.id !== id);
    this.set(STORAGE_KEYS.ANNOUNCEMENTS, list);
  }

  // Calendar
  getCalendarEvents(): AcademicEvent[] {
    return this.get<AcademicEvent[]>(STORAGE_KEYS.CALENDAR, INITIAL_CALENDAR_EVENTS);
  }

  saveCalendarEvent(event: AcademicEvent, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengelola kalender akademik.');
    }
    const itemToSave: AcademicEvent = { ...event, isDemoData: false };
    const list = this.getCalendarEvents();
    const index = list.findIndex((e) => e.id === itemToSave.id);
    if (index >= 0) {
      list[index] = itemToSave;
    } else {
      list.push(itemToSave);
    }
    this.set(STORAGE_KEYS.CALENDAR, list);
  }

  deleteCalendarEvent(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus agenda kalender.');
    }
    const list = this.getCalendarEvents().filter((e) => e.id !== id);
    this.set(STORAGE_KEYS.CALENDAR, list);
  }

  // Activities
  getActivitySchedules(): ActivitySchedule[] {
    return this.get<ActivitySchedule[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }

  saveActivitySchedule(activity: ActivitySchedule, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengelola jadwal kegiatan.');
    }
    const list = this.getActivitySchedules();
    const index = list.findIndex((a) => a.id === activity.id);
    if (index >= 0) {
      list[index] = activity;
    } else {
      list.push(activity);
    }
    this.set(STORAGE_KEYS.ACTIVITIES, list);
  }

  deleteActivitySchedule(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus jadwal kegiatan.');
    }
    const list = this.getActivitySchedules().filter((a) => a.id !== id);
    this.set(STORAGE_KEYS.ACTIVITIES, list);
  }

  // Extracurriculars
  getExtracurriculars(): Extracurricular[] {
    const list = this.get<Extracurricular[]>(STORAGE_KEYS.EXTRACURRICULARS, INITIAL_EXTRACURRICULARS);
    return list.map((item) => ({
      ...item,
      location: '',
      description: '',
    }));
  }

  saveExtracurricular(ekskul: Extracurricular, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengelola ekstrakurikuler.');
    }
    const list = this.getExtracurriculars();
    const index = list.findIndex((e) => e.id === ekskul.id);
    if (index >= 0) {
      list[index] = ekskul;
    } else {
      list.push(ekskul);
    }
    this.set(STORAGE_KEYS.EXTRACURRICULARS, list);
  }

  deleteExtracurricular(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus ekstrakurikuler.');
    }
    const list = this.getExtracurriculars().filter((e) => e.id !== id);
    this.set(STORAGE_KEYS.EXTRACURRICULARS, list);
  }

  joinExtracurricular(ekskulId: string): boolean {
    const list = this.getExtracurriculars();
    const item = list.find((e) => e.id === ekskulId);
    if (item) {
      const current = item.memberCount ?? 0;
      const max = item.maxCapacity ?? 100;
      if (current < max) {
        item.memberCount = current + 1;
        this.set(STORAGE_KEYS.EXTRACURRICULARS, list);
        return true;
      }
    }
    return false;
  }

  // Gallery
  getGalleryItems(): GalleryItem[] {
    return this.get<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }

  saveGalleryItem(item: GalleryItem, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengunggah foto galeri.');
    }
    const list = this.getGalleryItems();
    const index = list.findIndex((g) => g.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.unshift(item);
    }
    this.set(STORAGE_KEYS.GALLERY, list);
  }

  deleteGalleryItem(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus foto galeri.');
    }
    const list = this.getGalleryItems().filter((g) => g.id !== id);
    this.set(STORAGE_KEYS.GALLERY, list);
  }

  // Admin Services & Letter Requests
  getAdminServices(): AdminService[] {
    return this.get<AdminService[]>(STORAGE_KEYS.ADMIN_SERVICES, INITIAL_ADMIN_SERVICES);
  }

  saveAdminService(service: AdminService, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengubah informasi administrasi.');
    }
    const list = this.getAdminServices();
    const index = list.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      list[index] = service;
    } else {
      list.push(service);
    }
    this.set(STORAGE_KEYS.ADMIN_SERVICES, list);
  }

  deleteAdminService(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus layanan administrasi.');
    }
    const list = this.getAdminServices().filter((s) => s.id !== id);
    this.set(STORAGE_KEYS.ADMIN_SERVICES, list);
  }

  getLetterRequests(): LetterRequest[] {
    return this.get<LetterRequest[]>(STORAGE_KEYS.LETTER_REQUESTS, INITIAL_LETTER_REQUESTS);
  }

  submitLetterRequest(req: LetterRequest): void {
    const list = this.getLetterRequests();
    list.unshift(req);
    this.set(STORAGE_KEYS.LETTER_REQUESTS, list);
  }

  updateLetterRequestStatus(
    id: string,
    status: LetterRequest['status'],
    notes?: string,
    documentNumber?: string,
    token?: string | null
  ): void {
    if (!verifyAdminAccess(token ?? null)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat memproses surat permohonan.');
    }
    const list = this.getLetterRequests();
    const item = list.find((r) => r.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      if (documentNumber !== undefined) item.documentNumber = documentNumber;
      this.set(STORAGE_KEYS.LETTER_REQUESTS, list);
    }
  }

  // Student Accounts
  getStudents(): User[] {
    const allUsers = this.get<User[]>(STORAGE_KEYS.STUDENTS, INITIAL_USERS);
    return allUsers.filter((u) => u.role === 'siswa');
  }

  getAllUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.STUDENTS, INITIAL_USERS);
  }

  saveStudent(student: User, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat mengelola akun siswa.');
    }
    const list = this.getAllUsers();
    const index = list.findIndex((u) => u.id === student.id);
    if (index >= 0) {
      list[index] = student;
    } else {
      list.push(student);
    }
    this.set(STORAGE_KEYS.STUDENTS, list);
  }

  deleteStudent(id: string, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya pengelola/admin yang dapat menghapus akun siswa.');
    }
    const list = this.getAllUsers().filter((u) => u.id !== id);
    this.set(STORAGE_KEYS.STUDENTS, list);
  }

  // Update student/user password/PIN
  updateUserPassword(userId: string, newPin: string): void {
    const list = this.getAllUsers();
    const index = list.findIndex((u) => u.id === userId);
    if (index >= 0) {
      list[index].pin = newPin;
      this.set(STORAGE_KEYS.STUDENTS, list);
      
      const current = this.getCurrentUser();
      if (current && current.id === userId) {
        current.pin = newPin;
        this.set(STORAGE_KEYS.CURRENT_USER, current);
      }
    }
  }

  // School Contact Info
  getSchoolContact(): SchoolContactInfo {
    const contact = this.get<SchoolContactInfo>(STORAGE_KEYS.CONTACT, INITIAL_CONTACT_INFO);
    return {
      ...contact,
      npsn: '',
    };
  }

  saveSchoolContact(contact: SchoolContactInfo, token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya admin yang dapat memperbarui informasi kontak sekolah.');
    }
    this.set(STORAGE_KEYS.CONTACT, contact);
  }

  // Reset announcements specifically
  resetAnnouncementsToDefault(token: string | null): void {
    if (!verifyAdminAccess(token)) {
      throw new Error('Akses ditolak: Hanya admin yang dapat mereset data pengumuman.');
    }
    this.set(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  // Reset to initial data
  resetToDefaultData(): void {
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.CALENDAR);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.EXTRACURRICULARS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SERVICES);
    localStorage.removeItem(STORAGE_KEYS.LETTER_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.CONTACT);
    window.dispatchEvent(new Event('infosekolah_db_updated'));
  }
}

export const db = new StorageManager();
