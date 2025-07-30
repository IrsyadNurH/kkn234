// Tipe data untuk setiap anggota
export type Anggota = {
  nama: string;
  jabatan?: string;
  divisi: string;
  jurusan: string;
  imageUrl: string; // Foto untuk kartu
  slug: string;
  profilePicture: string; // Foto utama di halaman detail
  galleryImages: string[]; // Foto-foto tambahan untuk galeri
  quote: string;
  bio: string;
  social: {
    instagram?: string;
  };
};

// Tipe data untuk setiap divisi
export type Divisi = {
  nama: string;
  anggota: Anggota[];
};

// Data lengkap anggota
export const dataDivisi: Divisi[] = [
  {
    nama: 'Struktur Inti',
    anggota: [
      { 
        nama: 'R. Arik Athallah Bianov Wibisono', 
        jabatan: 'Ketua',
        divisi: 'Struktur Inti',
        jurusan: 'Sejarah Peradaban Islam', 
        imageUrl: '/images/anggota/arik.jpg',
        slug: 'arik-wibisono',
        profilePicture: '/images/anggota/profil/arik-1.jpg',
        galleryImages: ['/images/anggota/profil/arik-1.jpg', '/images/anggota/profil/arik-2.jpg', '/images/anggota/profil/arik-3.jpg'],
        quote: 'Memimpin dengan integritas, mengabdi dengan sepenuh hati.',
        bio: 'Arik adalah seorang mahasiswa Sejarah Peradaban Islam yang memiliki minat besar dalam kepemimpinan dan organisasi. Sebagai ketua, ia bertanggung jawab untuk mengkoordinasikan seluruh kegiatan KKN dan memastikan semua program berjalan lancar.',
        social: { instagram: '' }
      },
      { 
        nama: 'Aulia Hafifah Nuha', 
        jabatan: 'Sekretaris',
        divisi: 'Struktur Inti',
        jurusan: 'Ilmu Komunikasi Jurnalistik', 
        imageUrl: '/images/anggota/aulia.jpg',
        slug: 'aulia-nuha',
        profilePicture: '/images/anggota/profil/aulia-1.jpg',
        galleryImages: ['/images/anggota/profil/aulia-1.jpg', '/images/anggota/profil/aulia-2.jpg', '/images/anggota/profil/aulia-3.jpg'],
        quote: 'Setiap kata yang tertulis adalah jejak pengabdian.',
        bio: 'Aulia, dengan latar belakang jurnalistiknya, bertanggung jawab atas semua administrasi dan dokumentasi tertulis. Kemampuannya dalam berkomunikasi memastikan semua informasi tersampaikan dengan jelas dan akurat.',
        social: { instagram: '' }
      },
      { 
        nama: 'Yutrie Annisa Herlambang', 
        jabatan: 'Bendahara',
        divisi: 'Struktur Inti',
        jurusan: 'Pendidikan Islam Anak Usia Dini', 
        imageUrl: '/images/anggota/yutrie.jpg',
        slug: 'yutrie-herlambang',
        profilePicture: '/images/anggota/profil/yutrie-1.jpg',
        galleryImages: ['/images/anggota/profil/yutrie-1.jpg', '/images/anggota/profil/yutrie-2.jpg', '/images/anggota/profil/yutrie-3.jpg'],
        quote: 'Keuangan yang sehat adalah awal dari program yang hebat.',
        bio: 'Yutrie memegang peran krusial dalam mengelola keuangan kelompok. Dengan ketelitian dan kejujurannya, ia memastikan setiap dana digunakan secara efisien untuk keberhasilan program KKN.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi Acara',
    anggota: [
      { 
        nama: 'Saniyyah Barkah', 
        divisi: 'Divisi Acara',
        jurusan: 'Pendidikan Bahasa Arab', 
        imageUrl: '/images/anggota/saniyyah.jpg',
        slug: 'saniyyah-barkah',
        profilePicture: '/images/anggota/profil/saniyyah-1.jpg',
        galleryImages: ['/images/anggota/profil/saniyyah-1.jpg', '/images/anggota/profil/saniyyah-2.jpg', '/images/anggota/profil/saniyyah-3.jpg'],
        quote: 'Merancang acara yang berkesan adalah seni.',
        bio: 'Saniyyah adalah otak di balik perencanaan dan pelaksanaan berbagai acara KKN. Keahliannya dalam mengorganisir memastikan setiap kegiatan berjalan meriah dan sesuai dengan tujuan.',
        social: { instagram: '' }
      },
      { 
        nama: 'Puspa Ningrum Musayyadah', 
        divisi: 'Divisi Acara',
        jurusan: 'Pendidikan Fisika', 
        imageUrl: '/images/anggota/puspa.jpg',
        slug: 'puspa-ningrum',
        profilePicture: '/images/anggota/profil/puspa-1.jpg',
        galleryImages: ['/images/anggota/profil/puspa-1.jpg', '/images/anggota/profil/puspa-2.jpg', '/images/anggota/profil/puspa-3.jpg'],
        quote: 'Setiap detail acara adalah variabel menuju kesuksesan.',
        bio: 'Dengan pendekatan yang sistematis seperti fisika, Puspa membantu merancang acara dengan detail yang matang, memastikan semua aspek teknis dan non-teknis terpenuhi.',
        social: { instagram: '' }
      },
      { 
        nama: 'Miftah Sidiq Nur Islam', 
        divisi: 'Divisi Acara',
        jurusan: 'Aqidah dan Filsafat Islam', 
        imageUrl: '/images/anggota/miftah.jpg',
        slug: 'miftah-sidiq',
        profilePicture: '/images/anggota/profil/miftah-1.jpg',
        galleryImages: ['/images/anggota/profil/miftah-1.jpg', '/images/anggota/profil/miftah-2.jpg', '/images/anggota/profil/miftah-3.jpg'],
        quote: 'Acara yang baik memiliki makna yang mendalam.',
        bio: 'Miftah membawa perspektif filosofis ke dalam setiap acara, memastikan bahwa setiap kegiatan tidak hanya menghibur tetapi juga memberikan nilai dan makna bagi masyarakat.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi PDD',
    anggota: [
      { 
        nama: 'Irsyad Nur Hidayatullah', 
        divisi: 'Divisi PDD',
        jurusan: 'Teknik Informatika', 
        imageUrl: '/images/anggota/irsyad.jpg',
        slug: 'irsyad-nur',
        profilePicture: '/images/anggota/profil/irsyad-1.jpg',
        galleryImages: ['/images/anggota/profil/irsyad-1.jpg', '/images/anggota/profil/irsyad-2.jpg', '/images/anggota/profil/irsyad-3.jpg'],
        quote: 'Mendokumentasikan momen, mengabadikan cerita.',
        bio: 'Sebagai motor di divisi PDD, Irsyad bertanggung jawab atas semua aspek teknis dari dokumentasi, publikasi, dan desain visual, termasuk pembuatan website ini.',
        social: { instagram: '' }
      },
      { 
        nama: 'Muhammad Ridho Mujahid', 
        divisi: 'Divisi PDD',
        jurusan: 'Administrasi Publik', 
        imageUrl: '/images/anggota/ridho.jpg',
        slug: 'muhammad-ridho',
        profilePicture: '/images/anggota/profil/ridho-1.jpg',
        galleryImages: ['/images/anggota/profil/ridho-1.jpg', '/images/anggota/profil/ridho-2.jpg', '/images/anggota/profil/ridho-3.jpg'],
        quote: 'Setiap foto adalah arsip pengabdian.',
        bio: 'Ridho menggabungkan keahlian administrasinya dengan kreativitas untuk memastikan semua hasil dokumentasi terarsip dengan baik dan dipublikasikan secara efektif.',
        social: { instagram: '' }
      },
      { 
        nama: 'Aditya Novrizal Ramdani', 
        divisi: 'Divisi PDD',
        jurusan: 'Ekonomi Syari\'ah', 
        imageUrl: '/images/anggota/aditya.jpg',
        slug: 'aditya-novrizal',
        profilePicture: '/images/anggota/profil/aditya-1.jpg',
        galleryImages: ['/images/anggota/profil/aditya-1.jpg', '/images/anggota/profil/aditya-2.jpg', '/images/anggota/profil/aditya-3.jpg'],
        quote: 'Visual yang baik adalah investasi.',
        bio: 'Aditya membawa perspektif ekonomi dalam setiap desain, memastikan bahwa semua materi publikasi tidak hanya menarik secara visual tetapi juga efisien dan tepat sasaran.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi Humas',
    anggota: [
      { 
        nama: 'Agil Sapik Maulana', 
        divisi: 'Divisi Humas',
        jurusan: 'Komunikasi dan Penyiaran Islam', 
        imageUrl: '/images/anggota/agil.jpg',
        slug: 'agil-sapik',
        profilePicture: '/images/anggota/profil/agil-1.jpg',
        galleryImages: ['/images/anggota/profil/agil-1.jpg', '/images/anggota/profil/agil-2.jpg', '/images/anggota/profil/agil-3.jpg'],
        quote: 'Menjalin silaturahmi, membuka jalan pengabdian.',
        bio: 'Agil adalah wajah dari kelompok KKN, bertugas membangun hubungan baik dengan masyarakat, tokoh desa, dan pihak eksternal untuk kelancaran program.',
        social: { instagram: '' }
      },
      { 
        nama: 'Syifa Azzahra', 
        divisi: 'Divisi Humas',
        jurusan: 'Sosiologi', 
        imageUrl: '/images/anggota/syifa.jpg',
        slug: 'syifa-azzahra',
        profilePicture: '/images/anggota/profil/syifa-1.jpg',
        galleryImages: ['/images/anggota/profil/syifa-1.jpg', '/images/anggota/profil/syifa-2.jpg', '/images/anggota/profil/syifa-3.jpg'],
        quote: 'Memahami masyarakat adalah kunci komunikasi yang efektif.',
        bio: 'Dengan latar belakang sosiologinya, Syifa membantu tim untuk memahami struktur sosial dan budaya masyarakat, memastikan pendekatan humas yang tepat dan empatik.',
        social: { instagram: '' }
      },
      { 
        nama: 'Witria Yuliana', 
        divisi: 'Divisi Humas',
        jurusan: 'Tasawuf dan Psikoterapi', 
        imageUrl: '/images/anggota/witria.jpg',
        slug: 'witria-yuliana',
        profilePicture: '/images/anggota/profil/witria-1.jpg',
        galleryImages: ['/images/anggota/profil/witria-1.jpg', '/images/anggota/profil/witria-2.jpg', '/images/anggota/profil/witria-3.jpg'],
        quote: 'Komunikasi yang tulus datang dari hati.',
        bio: 'Witria menggunakan pemahamannya tentang psikologi untuk membangun komunikasi yang mendalam dan tulus dengan warga, membantu menyelesaikan masalah dan membangun kepercayaan.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi Konsumsi',
    anggota: [
      { 
        nama: 'Nok Windy Nurjanah', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Pendidikan Agama Islam', 
        imageUrl: '/images/anggota/windy.jpg',
        slug: 'nok-windy',
        profilePicture: '/images/anggota/profil/windy-1.jpg',
        galleryImages: ['/images/anggota/profil/windy-1.jpg', '/images/anggota/profil/windy-2.jpg', '/images/anggota/profil/windy-3.jpg'],
        quote: 'Energi tim berawal dari konsumsi yang baik.',
        bio: 'Windy memastikan seluruh anggota tim dan peserta kegiatan mendapatkan konsumsi yang cukup dan layak, menjaga semangat dan energi selama KKN berlangsung.',
        social: { instagram: '' }
      },
      { 
        nama: 'Rosalinda', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Hukum Tata Negara', 
        imageUrl: '/images/anggota/rosalinda.jpg',
        slug: 'rosalinda',
        profilePicture: '/images/anggota/profil/rosalinda-1.jpg',
        galleryImages: ['/images/anggota/profil/rosalinda-1.jpg', '/images/anggota/profil/rosalinda-2.jpg', '/images/anggota/profil/rosalinda-3.jpg'],
        quote: 'Keteraturan dalam konsumsi adalah cermin keteraturan program.',
        bio: 'Rosalinda menerapkan prinsip keteraturan dalam mengelola logistik dan distribusi konsumsi, memastikan semua berjalan sesuai rencana dan anggaran.',
        social: { instagram: '' }
      },
      { 
        nama: 'Nurjanah Azzahra', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Sastra Inggris', 
        imageUrl: '/images/anggota/nurjanah.jpg',
        slug: 'nurjanah-azzahra',
        profilePicture: '/images/anggota/profil/nurjanah-1.jpg',
        galleryImages: ['/images/anggota/profil/nurjanah-1.jpg', '/images/anggota/profil/nurjanah-2.jpg', '/images/anggota/profil/nurjanah-3.jpg'],
        quote: 'Menyajikan dengan senyuman adalah bumbu terbaik.',
        bio: 'Nurjanah tidak hanya membantu menyiapkan konsumsi, tetapi juga menyajikannya dengan ramah, menambah suasana positif dalam setiap kegiatan.',
        social: { instagram: '' }
      },
    ],
  },
];
