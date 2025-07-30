import Image from 'next/image';

// Data anggota dan divisi kita simpan di sini
const dataAnggota = [
  {
    divisi: 'Struktur Inti',
    anggota: [
      { nama: 'R. Arik Athallah Bianov Wibisono', jabatan: 'Ketua', jurusan: 'Sejarah Peradaban Islam' },
      { nama: 'Aulia Hafifah Nuha', jabatan: 'Sekretaris', jurusan: 'Ilmu Komunikasi Jurnalistik' },
      { nama: 'Yutrie Annisa Herlambang', jabatan: 'Bendahara', jurusan: 'Pendidikan Islam Anak Usia Dini' },
    ],
  },
  {
    divisi: 'Divisi Acara',
    anggota: [
      { nama: 'Saniyyah Barkah', jurusan: 'Pendidikan Bahasa Arab' },
      { nama: 'Puspa Ningrum Musayyadah', jurusan: 'Pendidikan Fisika' },
      { nama: 'Miftah Sidiq Nur Islam', jurusan: 'Aqidah dan Filsafat Islam' },
    ],
  },
  {
    divisi: 'Divisi PDD (Publikasi, Dekorasi, Dokumentasi)',
    anggota: [
      { nama: 'Irsyad Nur Hidayatullah', jurusan: 'Teknik Informatika' },
      { nama: 'Muhammad Ridho Mujahid', jurusan: 'Administrasi Publik' },
      { nama: 'Aditya Novrizal Ramdani', jurusan: 'Ekonomi Syari\'ah' },
    ],
  },
  {
    divisi: 'Divisi Humas',
    anggota: [
      { nama: 'Agil Sapik Maulana', jurusan: 'Komunikasi dan Penyiaran Islam' },
      { nama: 'Syifa Azzahra', jurusan: 'Sosiologi' },
      { nama: 'Witria Yuliana', jurusan: 'Tasawuf dan Psikoterapi' },
    ],
  },
  {
    divisi: 'Divisi Konsumsi',
    anggota: [
      { nama: 'Nok Windy Nurjanah', jurusan: 'Pendidikan Agama Islam' },
      { nama: 'Rosalinda', jurusan: 'Hukum Tata Negara' },
      { nama: 'Nurjanah Azzahra', jurusan: 'Sastra Inggris' },
    ],
  },
];

// Komponen untuk menampilkan kartu profil setiap anggota
function AnggotaCard({ nama, jabatan, jurusan }: { nama: string; jabatan?: string; jurusan: string; }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:-translate-y-2">
      <Image
        src={`https://placehold.co/128x128/e0e7ff/4f46e5?text=${nama.charAt(0)}`}
        alt={`Foto profil ${nama}`}
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-200"
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
