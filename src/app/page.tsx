import { prisma } from '../../lib/prisma';
import HomepageSlideshow from './components/HomepageSlideshow';
import ProkerCard from './components/ProkerCard';
import ArtikelCard from './components/ArtikelCard';
import Link from 'next/link';
import Image from 'next/image'; // Impor komponen Image

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
          {/* --- PERUBAHAN DI SINI --- */}
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Link 
              href="https://www.instagram.com/kkn234.mangunarga?igsh=MThjYXl3aTRndTB0OA=="
              target="_blank"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.04 2.113a8.896 8.896 0 00-1.258.106c-.836.085-1.4.234-1.844.41a3.102 3.102 0 00-1.153.802c-.345.345-.617.762-.802 1.153-.176.444-.325 1.008-.41 1.844-.091.826-.106 1.123-.106 3.233s.015 2.407.106 3.233c.085.836.234 1.4.41 1.844a3.102 3.102 0 00.802 1.153c.345.345.762.617 1.153.802.444.176 1.008.325 1.844.41.826.091 1.123.106 3.233.106s2.407-.015 3.233-.106c.836-.085 1.4-.234-1.844-.41a3.102 3.102 0 001.153-.802c.345-.345.617-.762-.802-1.153.176-.444-.325-1.008-.41-1.844.091-.826.106-1.123.106-3.233s-.015-2.407-.106-3.233c-.085-.836-.234-1.4-.41-1.844a3.102 3.102 0 00-.802-1.153c-.345-.345-.762-.617-1.153-.802-.444-.176-1.008-.325-1.844-.41-.826-.091-1.123-.106-3.233-.106zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
              @kkn234.mangunarga
            </Link>
            <Link 
              href="https://www.tiktok.com/@kkn234.mangunarga?_t=ZS-8ymju1ZFfxE&_r=1"
              target="_blank"
              className="inline-flex items-center gap-3 bg-gray-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.88-1.59-1.93-2.23-4.5-1.91-7.12.32-2.61 1.8-4.88 3.83-6.36 2.04-1.49 4.56-2.09 7.02-1.74-.04 2.11-.02 4.22.02 6.33-.01 1.08-.37 2.14-1.05 2.96-.69.81-1.63 1.26-2.66 1.32-1.03.06-2.06-.15-2.93-.61-.87-.47-1.53-1.24-1.89-2.21-.24-.65-.3-1.36-.26-2.08.03-.73.23-1.45.56-2.1.33-.65.8-1.23 1.38-1.69.58-.46 1.26-.78 1.98-.95.72-.17 1.46-.2 2.18-.09.04 1.57.02 3.14-.02 4.71-.18.17-.36.33-.56.48-.44.35-.95.6-1.5.73-.55.13-1.1.16-1.65.09-.55-.07-1.08-.27-1.53-.59-.45-.32-.83-.72-1.11-1.19-.28-.47-.45-.99-.5-1.52-.05-.53.01-1.07.18-1.59.17-.52.45-1 .81-1.41.36-.41.8-  .74 1.29-1 .49-.26 1.02-.43 1.57-.51.55-.08 1.1-.06 1.65.02.55.08 1.09.26 1.59.52.5.26.95.6 1.34 1.01.39.41.7   .89.92 1.41.22.52.33 1.08.34 1.64.01.56-.09 1.12-.29 1.64-.2.52-.5 1-.88 1.41-.38.41-.84.74-1.35.99-.51.25-1.07.4-1.64.44-.57.04-1.14.01-1.71-.11Z"/></svg>
              @kkn234.mangunarga
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* --- BAGIAN PETA TEMATIK BARU --- */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Peta Batas Wilayah Desa Mangunarga RW 06 & 08
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
        
          {/* --- BAGIAN PETA LOKASI --- */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Lokasi Desa Mangunarga
          </h2>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              // PERBAIKAN: URL embed Google Maps diperbarui dengan zoom lebih dekat
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7921.332380530728!2d107.7868356922915!3d-6.930503949999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3a110315705%3A0x5e4491a1a54f6b0!2sMangunarga%2C%20Kec.%20Cimanggung%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1723370630563!5m2!1sid!2sid"
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