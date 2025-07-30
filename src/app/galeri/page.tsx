// app/galeri/page.tsx
import { PrismaClient, Dokumentasi } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk mengambil data dari database
async function getDokumentasi() {
  // Untuk demo, kita tambahkan beberapa data contoh jika database kosong
  const count = await prisma.dokumentasi.count();
  if (count === 0) {
    await prisma.dokumentasi.createMany({
      data: [
        {
          imageUrl: 'https://via.placeholder.com/400x300.png?text=Kegiatan+1',
          caption: 'Gotong Royong Membersihkan Desa',
        },
        {
          imageUrl: 'https://via.placeholder.com/400x300.png?text=Kegiatan+2',
          caption: 'Penyuluhan Stunting di Balai Desa',
        },
        {
          imageUrl: 'https://via.placeholder.com/400x300.png?text=Kegiatan+3',
          caption: 'Mengajar Anak-Anak di Sekolah Dasar',
        },
      ],
    });
  }
  return prisma.dokumentasi.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function GaleriPage() {
  const fotoList: Dokumentasi[] = await getDokumentasi();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Galeri Dokumentasi Kegiatan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Tidak perlu lagi mendefinisikan tipe 'foto' secara manual */}
        {fotoList.map((foto) => (
          <div key={foto.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <img
              src={foto.imageUrl}
              alt={foto.caption}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <p className="text-md font-semibold text-gray-700">{foto.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
