// app/galeri/page.tsx
import { prisma } from '../../../lib/prisma';
import { Dokumentasi } from '@prisma/client';

// Fungsi untuk mengambil data dari database
async function getDokumentasi() {
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

      {/* Tampilkan pesan jika tidak ada foto */}
      {fotoList.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada foto yang diunggah.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      )}
    </div>
  );
}