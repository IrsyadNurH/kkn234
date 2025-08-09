import { prisma } from '../../lib/prisma'; // PERBAIKAN: Menggunakan named import
import HomepageSlideshow from './components/HomepageSlideshow';
import ProkerCard from './components/ProkerCard';
import ArtikelCard from './components/ArtikelCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getHomepageData() {
  const [latestPhotos, prokerUnggulan, latestArtikel] = await Promise.all([
    prisma.dokumentasi.findMany({
      take: 7,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.programKerja.findMany({
      take: 10,
      orderBy: { tanggal: 'desc' },
    }),
    prisma.artikel.findMany({
      take: 10,
      orderBy: { tanggalTerbit: 'desc' },
    }),
  ]);
  return { latestPhotos, prokerUnggulan, latestArtikel };
}

export default async function Home() {
  const { latestPhotos, prokerUnggulan, latestArtikel } = await getHomepageData();

  return (
    <div className="w-full">
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dokumentasi Kegiatan
        </h2>
        <HomepageSlideshow images={latestPhotos} />
      </section>

      <section className="py-16 bg-pattern-proker">
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

      <section className="py-16 bg-pattern-artikel">
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
