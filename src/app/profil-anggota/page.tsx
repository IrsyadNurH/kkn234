import Image from 'next/image';

// Data anggota dan divisi dengan path gambar untuk setiap anggota
const dataAnggota = [
  {
    divisi: 'Struktur Inti',
    anggota: [
      { nama: 'R. Arik Athallah Bianov Wibisono', jabatan: 'Ketua', jurusan: 'Sejarah Peradaban Islam', imageUrl: '/images/anggota/arik.jpg' },
      { nama: 'Aulia Hafifah Nuha', jabatan: 'Sekretaris', jurusan: 'Ilmu Komunikasi Jurnalistik', imageUrl: '/images/anggota/aulia.jpg' },
      { nama: 'Yutrie Annisa Herlambang', jabatan: 'Bendahara', jurusan: 'Pendidikan Islam Anak Usia Dini', imageUrl: '/images/anggota/yutrie.jpg' },
    ],
  },
  {
    divisi: 'Divisi Acara',
    anggota: [
      { nama: 'Saniyyah Barkah', jurusan: 'Pendidikan Bahasa Arab', imageUrl: '/images/anggota/saniyyah.jpg' },
      { nama: 'Puspa Ningrum Musayyadah', jurusan: 'Pendidikan Fisika', imageUrl: '/images/anggota/puspa.jpg' },
      { nama: 'Miftah Sidiq Nur Islam', jurusan: 'Aqidah dan Filsafat Islam', imageUrl: '/images/anggota/miftah.jpg' },
    ],
  },
  {
    divisi: 'Divisi PDD (Publikasi, Dekorasi, Dokumentasi)',
    anggota: [
      { nama: 'Irsyad Nur Hidayatullah', jurusan: 'Teknik Informatika', imageUrl: '../../../public/irsyad.jpg' },
      { nama: 'Muhammad Ridho Mujahid', jurusan: 'Administrasi Publik', imageUrl: '/images/anggota/ridho.jpg' },
      { nama: 'Aditya Novrizal Ramdani', jurusan: 'Ekonomi Syari\'ah', imageUrl: '/images/anggota/aditya.jpg' },
    ],
  },
  {
    divisi: 'Divisi Humas',
    anggota: [
      { nama: 'Agil Sapik Maulana', jurusan: 'Komunikasi dan Penyiaran Islam', imageUrl: '/images/anggota/agil.jpg' },
      { nama: 'Syifa Azzahra', jurusan: 'Sosiologi', imageUrl: '/images/anggota/syifa.jpg' },
      { nama: 'Witria Yuliana', jurusan: 'Tasawuf dan Psikoterapi', imageUrl: '/images/anggota/witria.jpg' },
    ],
  },
  {
    divisi: 'Divisi Konsumsi',
    anggota: [
      { nama: 'Nok Windy Nurjanah', jurusan: 'Pendidikan Agama Islam', imageUrl: '/images/anggota/windy.jpg' },
      { nama: 'Rosalinda', jurusan: 'Hukum Tata Negara', imageUrl: '/images/anggota/rosalinda.jpg' },
      { nama: 'Nurjanah Azzahra', jurusan: 'Sastra Inggris', imageUrl: '/images/anggota/nurjanah.jpg' },
    ],
  },
];

// Komponen untuk menampilkan kartu profil setiap anggota
function AnggotaCard({ nama, jabatan, jurusan, imageUrl }: { nama: string; jabatan?: string; jurusan: string; imageUrl: string; }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:-translate-y-2">
      <Image
        src={imageUrl} // Menggunakan path gambar dari data
        alt={`Foto profil ${nama}`}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-200 object-cover" // object-cover agar foto tidak penyok
      />
      <h3 className="text-xl font-bold text-gray-800">{nama}</h3>
      {jabatan && (
        <p className="text-blue-600 font-semibold mt-1">{jabatan}</p>
      )}
      <p className="text-gray-500 mt-2">{jurusan}</p>
    </div>
  );
}

// Komponen utama untuk halaman profil
export default function ProfilAnggotaPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Profil Anggota KKN 234 Mangunarga
      </h1>

      {dataAnggota.map((divisi) => (
        <section key={divisi.divisi} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-4 border-blue-500">
            {divisi.divisi}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisi.anggota.map((anggota) => (
              <AnggotaCard key={anggota.nama} {...anggota} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
