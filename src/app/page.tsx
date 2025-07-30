import { prisma }from '../../lib/prisma';
import HomepageSlideshow from './components/HomepageSlideshow';
import ProkerCard from './components/ProkerCard';
import ArtikelCard from './components/ArtikelCard';
import Link from 'next/link';

// Fungsi untuk mengambil semua data yang dibutuhkan secara bersamaan
async function getHomepageData() {
  const [latestPhotos, prokerUnggulan, latestArtikel] = await Promise.all([
    prisma.dokumentasi.findMany({
      take: 7,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.programKerja.findMany({
      take: 10, // Ambil 10 program kerja
      orderBy: { tanggal: 'desc' },
    }),
    prisma.artikel.findMany({
      take: 10, // Ambil 10 artikel
      orderBy: { createdAt: 'desc' },
    }),
  ]);
  return { latestPhotos, prokerUnggulan, latestArtikel };
}

// Komponen untuk pembatas antar seksi dengan bentuk gelombang
function SectionDivider() {
  return (
    <div className="w-full h-20 overflow-hidden">
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="stroke-none fill-current text-slate-100"></path>
      </svg>
    </div>
  );
}

export default async function Home() {
  const { latestPhotos, prokerUnggulan, latestArtikel } = await getHomepageData();

  return (
    <div className="w-full">
      {/* Bagian Slideshow */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dokumentasi Kegiatan
        </h2>
        <HomepageSlideshow images={latestPhotos} />
      </section>

      {/* Bagian Program Kerja Unggulan */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-4 sm:px-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Program Kerja Unggulan</h2>
            <Link href="/program-kerja" className="text-blue-500 hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 sm:px-6 snap-x snap-mandatory">
            {prokerUnggulan.map((program) => (
              <ProkerCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Pembatas */}
      <SectionDivider />

      {/* Bagian Artikel Terbaru */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-4 sm:px-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Artikel Terbaru</h2>
            <Link href="/artikel" className="text-blue-500 hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 sm:px-6 snap-x snap-mandatory">
            {latestArtikel.map((artikel) => (
              <ArtikelCard key={artikel.id} artikel={artikel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
