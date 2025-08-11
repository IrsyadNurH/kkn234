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
  bannerUrl: string; // <-- PROPERTI BARU
  anggota: Anggota[];
};

// Data lengkap anggota
export const dataDivisi: Divisi[] = [
  {
    nama: 'Ex-Off',
    bannerUrl: '/banners/ex-off.jpg', 
    anggota: [
     
      { 
        nama: 'Aulia Hafifah Nuha', 
        jabatan: 'Sekretaris',
        divisi: 'Struktur Inti',
        jurusan: 'Ilmu Komunikasi Jurnalistik', 
        imageUrl: 'fotoAnggota/aul1.png',
        slug: 'aulia-nuha',
        profilePicture: 'fotoAnggota/aul1.png',
        galleryImages: ['fotoAnggota/aul1.png', 'fotoAnggota/aul2.png', 'fotoAnggota/aul3.png'],
        quote: 'Setiap kata yang tertulis adalah jejak pengabdian.',
        bio: 'Aulia, dengan latar belakang jurnalistiknya, bertanggung jawab atas semua administrasi dan dokumentasi tertulis. Kemampuannya dalam berkomunikasi memastikan semua informasi tersampaikan dengan jelas dan akurat.',
        social: { instagram: '' }
      },
       { 
        nama: 'R. Arik Athallah Bianov Wibisono', 
        jabatan: 'Ketua',
        divisi: 'Struktur Inti',
        jurusan: 'Sejarah Peradaban Islam', 
        imageUrl: 'fotoAnggota/arik.png',
        slug: 'arik-wibisono',
        profilePicture: 'fotoAnggota/atthala1.png',
        galleryImages: ['fotoAnggota/atthala1.png', 'fotoAnggota/atthala2.png', 'fotoAnggota/atthala3.png'],
        quote: 'Memimpin dengan integritas, mengabdi dengan sepenuh hati.',
        bio: 'Arik adalah seorang mahasiswa Sejarah Peradaban Islam yang memiliki minat besar dalam kepemimpinan dan organisasi. Sebagai ketua, ia bertanggung jawab untuk mengkoordinasikan seluruh kegiatan KKN dan memastikan semua program berjalan lancar.',
        social: { instagram: '' }
      },
      { 
        nama: 'Yutrie Annisa Herlambang', 
        jabatan: 'Bendahara',
        divisi: 'Struktur Inti',
        jurusan: 'Pendidikan Islam Anak Usia Dini', 
        imageUrl: 'fotoAnggota/yut1.png',
        slug: 'yutrie-herlambang',
        profilePicture: 'fotoAnggota/yut1.png',
        galleryImages: ['fotoAnggota/yut1.png', 'fotoAnggota/yut2.png', 'fotoAnggota/yut3.png'],
        quote: 'Keuangan yang sehat adalah awal dari program yang hebat.',
        bio: 'Yutrie memegang peran krusial dalam mengelola keuangan kelompok. Dengan ketelitian dan kejujurannya, ia memastikan setiap dana digunakan secara efisien untuk keberhasilan program KKN.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi Acara',
    bannerUrl: '/banners/acara.JPG', 
    anggota: [
      { 
        nama: 'Miftah Sidiq Nur Islam', 
        divisi: 'Divisi Acara',
        jurusan: 'Aqidah dan Filsafat Islam', 
        imageUrl: 'fotoAnggota/miftah.png',
        slug: 'miftah-sidiq',
        profilePicture: 'fotoAnggota/miftah1.png',
        galleryImages: ['fotoAnggota/miftah1.png', 'fotoAnggota/miftah2.png', 'fotoAnggota/miftah3.png'],
        quote: 'Acara yang baik memiliki makna yang mendalam.',
        bio: 'Miftah membawa perspektif filosofis ke dalam setiap acara, memastikan bahwa setiap kegiatan tidak hanya menghibur tetapi juga memberikan nilai dan makna bagi masyarakat.',
        social: { instagram: '' }
      },
      { 
        nama: 'Puspa Ningrum Musayyadah', 
        divisi: 'Divisi Acara',
        jurusan: 'Pendidikan Fisika', 
        imageUrl: 'fotoAnggota/puspa1.png',
        slug: 'puspa-ningrum',
        profilePicture: 'fotoAnggota/puspa1.png',
        galleryImages: ['fotoAnggota/puspa1.png', 'fotoAnggota/puspa2.png', 'fotoAnggota/puspa3.png'],
        quote: 'Setiap detail acara adalah variabel menuju kesuksesan.',
        bio: 'Dengan pendekatan yang sistematis seperti fisika, Puspa membantu merancang acara dengan detail yang matang, memastikan semua aspek teknis dan non-teknis terpenuhi.',
        social: { instagram: '' }
      },
      {
        nama: 'Saniyyah Barkah', 
        divisi: 'Divisi Acara',
        jurusan: 'Pendidikan Bahasa Arab', 
        imageUrl: 'fotoAnggota/saniyyah1.png',
        slug: 'saniyyah-barkah',
        profilePicture: 'fotoAnggota/saniyyah1.png',
        galleryImages: ['fotoAnggota/saniyyah1.png', 'fotoAnggota/saniyyah2.png', 'fotoAnggota/saniyyah3.png'],
        quote: 'Merancang acara yang berkesan adalah seni.',
        bio: 'Saniyyah adalah otak di balik perencanaan dan pelaksanaan berbagai acara KKN. Keahliannya dalam mengorganisir memastikan setiap kegiatan berjalan meriah dan sesuai dengan tujuan.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi PDD',
    bannerUrl: '/banners/pdd.JPG', 
    anggota: [
      
      { 
        nama: 'Muhammad Ridho Mujahid', 
        divisi: 'Divisi PDD',
        jurusan: 'Administrasi Publik', 
        imageUrl: 'fotoAnggota/rido1.png',
        slug: 'muhammad-ridho',
        profilePicture: 'fotoAnggota/rido1.png',
        galleryImages: ['fotoAnggota/rido1.png', 'fotoAnggota/rido2.png', 'fotoAnggota/rido3.png'],
        quote: 'Setiap foto adalah arsip pengabdian.',
        bio: 'Ridho menggabungkan keahlian administrasinya dengan kreativitas untuk memastikan semua hasil dokumentasi terarsip dengan baik dan dipublikasikan secara efektif.',
        social: { instagram: '' }
      },
      { 
        nama: 'Aditya Novrizal Ramdani', 
        divisi: 'Divisi PDD',
        jurusan: 'Ekonomi Syari\'ah', 
        imageUrl: 'fotoAnggota/adit1.png',
        slug: 'aditya-novrizal',
        profilePicture: 'fotoAnggota/adit1.png',
        galleryImages: ['fotoAnggota/adit1.png', 'fotoAnggota/adit2.png', 'fotoAnggota/adit3.png'],
        quote: 'Visual yang baik adalah investasi.',
        bio: 'Aditya membawa perspektif ekonomi dalam setiap desain, memastikan bahwa semua materi publikasi tidak hanya menarik secara visual tetapi juga efisien dan tepat sasaran.',
        social: { instagram: '' }
      },
      { 
        nama: 'Irsyad Nur Hidayatullah', 
        divisi: 'Divisi PDD',
        jurusan: 'Teknik Informatika', 
        imageUrl: 'fotoAnggota/irsyad.jpg',
        slug: 'irsyad-nur',
        profilePicture: 'fotoAnggota/Irsyad1.png',
        galleryImages: ['fotoAnggota/Irsyad1.png', 'fotoAnggota/Irsyad2.png', 'fotoAnggota/Irsyad3.png'],
        quote: 'Mendokumentasikan momen, mengabadikan cerita.',
        bio: 'Sebagai motor di divisi PDD, Irsyad bertanggung jawab atas semua aspek teknis dari dokumentasi, publikasi, dan desain visual, termasuk pembuatan website ini.',
        social: { instagram: 'https://www.instagram.com/irsyadnh_?igsh=c2dmb2g1YmU2aGw5' }
      },
    ],
  },
  {
    nama: 'Divisi Humas',
    bannerUrl: '/banners/humas.JPG', 
    anggota: [
       { 
        nama: 'Syifa Azzahra', 
        divisi: 'Divisi Humas',
        jurusan: 'Sosiologi', 
        imageUrl: 'fotoAnggota/syifa1.png',
        slug: 'syifa-azzahra',
        profilePicture: 'fotoAnggota/syifa1.png',
        galleryImages: ['fotoAnggota/syifa1.png', 'fotoAnggota/syifa2.png', 'fotoAnggota/syifa3.png'],
        quote: 'Memahami masyarakat adalah kunci komunikasi yang efektif.',
        bio: 'Dengan latar belakang sosiologinya, Syifa membantu tim untuk memahami struktur sosial dan budaya masyarakat, memastikan pendekatan humas yang tepat dan empatik.',
        social: { instagram: '' }
      },
      { 
        nama: 'Agil Sapik Maulana', 
        divisi: 'Divisi Humas',
        jurusan: 'Komunikasi dan Penyiaran Islam', 
        imageUrl: 'fotoAnggota/agil1.png',
        slug: 'agil-sapik',
        profilePicture: 'fotoAnggota/agil1.png',
        galleryImages: ['fotoAnggota/agil1.png', 'fotoAnggota/agil2.png', 'fotoAnggota/agil3.png'],
        quote: 'Menjalin silaturahmi, membuka jalan pengabdian.',
        bio: 'Agil adalah wajah dari kelompok KKN, bertugas membangun hubungan baik dengan masyarakat, tokoh desa, dan pihak eksternal untuk kelancaran program.',
        social: { instagram: '' }
      },
     
      { 
        nama: 'Witria Yuliana', 
        divisi: 'Divisi Humas',
        jurusan: 'Tasawuf dan Psikoterapi', 
        imageUrl: 'fotoAnggota/wit1.png',
        slug: 'witria-yuliana',
        profilePicture: 'fotoAnggota/wit1.png',
        galleryImages: ['fotoAnggota/wit1.png', 'fotoAnggota/wit2.png', 'fotoAnggota/wit3.png'],
        quote: 'Komunikasi yang tulus datang dari hati.',
        bio: 'Witria menggunakan pemahamannya tentang psikologi untuk membangun komunikasi yang mendalam dan tulus dengan warga, membantu menyelesaikan masalah dan membangun kepercayaan.',
        social: { instagram: '' }
      },
    ],
  },
  {
    nama: 'Divisi Konsumsi',
    bannerUrl: '/banners/konsumsi.JPG', 
    anggota: [
      { 
        nama: 'Nok Windy Nurjanah', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Pendidikan Agama Islam', 
        imageUrl: 'fotoAnggota/windy1.png',
        slug: 'nok-windy',
        profilePicture: 'fotoAnggota/windy1.png',
        galleryImages: ['fotoAnggota/windy1.png', 'fotoAnggota/windy2.png', 'fotoAnggota/windy3.png'],
        quote: 'Energi tim berawal dari konsumsi yang baik.',
        bio: 'Windy memastikan seluruh anggota tim dan peserta kegiatan mendapatkan konsumsi yang cukup dan layak, menjaga semangat dan energi selama KKN berlangsung.',
        social: { instagram: '' }
      },
      { 
        nama: 'Nurjanah Azzahra', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Sastra Inggris', 
        imageUrl: 'fotoAnggota/nur1.png',
        slug: 'nurjanah-azzahra',
        profilePicture: 'fotoAnggota/nur1.png',
        galleryImages: ['fotoAnggota/nur1.png', 'fotoAnggota/nur2.png', 'fotoAnggota/nur3.png'],
        quote: 'Menyajikan dengan senyuman adalah bumbu terbaik.',
        bio: 'Nurjanah tidak hanya membantu menyiapkan konsumsi, tetapi juga menyajikannya dengan ramah, menambah suasana positif dalam setiap kegiatan.',
        social: { instagram: '' }
      },
      { 
        nama: 'Rosalinda', 
        divisi: 'Divisi Konsumsi',
        jurusan: 'Hukum Tata Negara', 
        imageUrl: 'fotoAnggota/ocha1.png',
        slug: 'rosalinda',
        profilePicture: 'fotoAnggota/ocha1.png',
        galleryImages: ['fotoAnggota/ocha1.png', 'fotoAnggota/ocha2.png', 'fotoAnggota/ocha3.png'],
        quote: 'Keteraturan dalam konsumsi adalah cermin keteraturan program.',
        bio: 'Rosalinda menerapkan prinsip keteraturan dalam mengelola logistik dan distribusi konsumsi, memastikan semua berjalan sesuai rencana dan anggaran.',
        social: { instagram: '' }
      },
      
    ],
  },
];
