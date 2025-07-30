import { prisma } from '../../lib/prisma';
import HomepageSlideshow from './components/HomepageSlideshow';

// Fungsi untuk mengambil foto-foto terbaru dari database
async function getLatestDokumentasi() {
  return prisma.dokumentasi.findMany({
    take: 7, // Ambil 7 foto terbaru untuk ditampilkan di slideshow
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function Home() {
  const latestPhotos = await getLatestDokumentasi();

  return (
    // Gunakan space-y untuk memberi jarak antar bagian
    <div className="container mx-auto px-6 py-16 space-y-16">
      
      {/* Bagian Sambutan */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Selamat Datang di Website
          <br />
          <span className="text-blue-600">KKN 234 MANGUNARGA</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Mengabdi dengan Hati, Membangun Desa, Mencerdaskan Bangsa. Jelajahi program kerja dan kegiatan kami di Desa Mangunarga.
        </p>
      </div>

      {/* Bagian Slideshow Dokumentasi */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dokumentasi Terbaru
        </h2>
        <HomepageSlideshow images={latestPhotos} />
      </div>

    </div>
  );
}
