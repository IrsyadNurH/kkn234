import { prisma } from '../../lib/prisma';
import HomepageSlideshow from './components/HomepageSlideshow';
import ProkerCard from './components/ProkerCard';
import ArtikelCard from './components/ArtikelCard';
import Link from 'next/link';
import Image from 'next/image';

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

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ikuti Perjalanan Kami
          </h2>
          <p className="text-gray-600 mb-8">
            Dapatkan update terbaru dari kegiatan kami langsung di media sosial.
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link 
              href="https://www.instagram.com/kkn234.mangunarga?igsh=MThjYXl3aTRndTB0OA=="
              target="_blank"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              {/* --- PERBAIKAN DI SINI --- */}
              <Image
                src="/instagram-logo.svg"
                alt="Instagram Icon"
                width={24}
                height={24}
                className="filter invert" // Membuat ikon menjadi putih
              />
              @kkn234.mangunarga
            </Link>
            <Link 
              href="https://www.tiktok.com/@kkn234.mangunarga?_t=ZS-8ymju1ZFfxE&_r=1"
              target="_blank"
              className="inline-flex items-center gap-3 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Image
                src="/tiktok-logo.svg"
                alt="TikTok Icon"
                width={24}
                height={24}
                className="filter invert"
              />
              @kkn234.mangunarga
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Peta Wilayah Desa
          </h2>
          <div className="mb-16 rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/peta-tematik.jpg" 
              alt="Peta Tematik Desa Mangunarga"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Lokasi Desa Mangunarga
          </h2>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7921.332380530728!2d107.7868356922915!3d-6.930503949999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3a110315705%3A0x5e4491a1a54f6b0!2sMangunarga%2C%2C%20Kec.%20Cimanggung%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1723370630563!5m2!1sid!2sid"
              className="w-full h-96 border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
