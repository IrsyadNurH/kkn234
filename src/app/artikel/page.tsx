// app/artikel/page.tsx
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

// Tambahkan baris ini untuk membuat halaman menjadi dinamis
export const dynamic = 'force-dynamic';

async function getArtikel() {
  return prisma.artikel.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function ArtikelListPage() {
  const daftarArtikel = await getArtikel();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Artikel & Berita Kegiatan
      </h1>
      <div className="space-y-8">
        {daftarArtikel.map((artikel) => (
          <div key={artikel.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{artikel.judul}</h2>
            <p className="text-gray-500 text-sm mb-4">
              Diterbitkan pada {new Date(artikel.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-700 whitespace-pre-line">{artikel.konten.substring(0, 300)}...</p>
          </div>
        ))}
        {daftarArtikel.length === 0 && (
          <p className="text-center text-gray-500">Belum ada artikel yang diterbitkan.</p>
        )}
      </div>
    </div>
  );
}
