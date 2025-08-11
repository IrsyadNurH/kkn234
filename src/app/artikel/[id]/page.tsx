import {prisma} from '../../../../lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Fungsi ini membantu Next.js mengetahui halaman mana yang akan dibuat secara statis
export async function generateStaticParams() {
    const artikel = await prisma.artikel.findMany({
        select: { id: true }
    });
    return artikel.map(a => ({
        id: a.id.toString(),
    }));
}

async function getArtikelDetail(id: number) {
  const artikel = await prisma.artikel.findUnique({
    where: { id },
  });
  if (!artikel) {
    notFound();
  }
  return artikel;
}

// Definisikan tipe props untuk halaman sesuai standar Next.js 15
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { id: idString } = await params; // Await params untuk mendapatkan ID
  const id = parseInt(idString, 10);

  if (isNaN(id)) {
    notFound();
  }

  const artikel = await getArtikelDetail(id);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {artikel.imageUrl && (
        <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={artikel.imageUrl} alt={artikel.judul} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{artikel.judul}</h1>
      <p className="text-gray-500 mb-8">
        Diterbitkan pada {new Date(artikel.tanggalTerbit).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
        {artikel.konten}
      </div>
    </div>
  );
}
