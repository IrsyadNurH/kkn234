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
            Dapatkan update terbaru dari kegiatan kami langsung di Instagram.
          </p>
          <Link 
            href="https://www.instagram.com/kkn234.mangunarga?igsh=MThjYXl3aTRndTB0OA=="
            target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.04 2.113a8.896 8.896 0 00-1.258.106c-.836.085-1.4.234-1.844.41a3.102 3.102 0 00-1.153.802c-.345.345-.617.762-.802 1.153-.176.444-.325 1.008-.41 1.844-.091.826-.106 1.123-.106 3.233s.015 2.407.106 3.233c.085.836.234 1.4.41 1.844a3.102 3.102 0 00.802 1.153c.345.345.762.617 1.153.802.444.176 1.008.325 1.844.41.826.091 1.123.106 3.233.106s2.407-.015 3.233-.106c.836-.085 1.4-.234-1.844-.41a3.102 3.102 0 001.153-.802c.345-.345.617-.762-.802-1.153.176-.444-.325-1.008-.41-1.844.091-.826.106-1.123.106-3.233s-.015-2.407-.106-3.233c-.085-.836-.234-1.4-.41-1.844a3.102 3.102 0 00-.802-1.153c-.345-.345-.762-.617-1.153-.802-.444-.176-1.008-.325-1.844-.41-.826-.091-1.123-.106-3.233-.106zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
            @kkn234.mangunarga
          </Link>
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
              // PERBAIKAN: URL embed Google Maps diperbarui
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31685.33405364817!2d107.77926889453125!3d-6.930438600000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3a110315705%3A0x5e4491a1a54f6b0!2sMangunarga%2C%2C%20Kec.%20Cimanggung%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1691745781471!5m2!1sid!2sid"
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
