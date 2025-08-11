// app/artikel/page.tsx
import { prisma } from '../../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getArtikel() {
  return prisma.artikel.findMany({
    orderBy: { tanggalTerbit: 'desc' },
  });
}

export default async function ArtikelListPage() {
  const daftarArtikel = await getArtikel();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Artikel & Berita Kegiatan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {daftarArtikel.map((artikel) => (
          <Link href={`/artikel/${artikel.id}`} key={artikel.id} className="block group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform transform group-hover:-translate-y-2">
              {artikel.imageUrl && (
                <div className="relative w-full h-48">
                  <Image src={artikel.imageUrl} alt={artikel.judul} fill className="object-cover" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{artikel.judul}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(artikel.tanggalTerbit).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-gray-600 text-sm flex-grow">
                  {artikel.konten.substring(0, 100)}...
                </p>
                <div className="mt-4 text-right text-sm text-blue-500 font-semibold">
                  Baca Selengkapnya &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
