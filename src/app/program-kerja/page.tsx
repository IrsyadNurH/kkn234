// app/program-kerja/page.tsx
import { prisma } from '../../../lib/prisma';
import Image from 'next/image'; // Impor Image
import Link from 'next/link';

// Tambahkan baris ini untuk membuat halaman menjadi dinamis
export const dynamic = 'force-dynamic';

// Ambil data Program Kerja dari database
async function getProgramKerja() {
  return prisma.programKerja.findMany({
    orderBy: { tanggal: 'desc' },
  });
}

export default async function ProgramKerjaPage() {
  const daftarProgram = await getProgramKerja();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Program Kerja
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {daftarProgram.map((program) => (
          <Link href={`/program-kerja/${program.id}`} key={program.id} className="block group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform transform group-hover:-translate-y-2">
              {program.imageUrl && (
                <div className="relative w-full h-48">
                  <Image src={program.imageUrl} alt={program.nama} fill className="object-cover" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{program.nama}</h2>
                <p className="text-gray-600 text-sm flex-grow">
                  {/* Menampilkan deskripsi singkat (100 karakter pertama) */}
                  {program.deskripsi.substring(0, 100)}...
                </p>
                <div className="mt-4 text-right text-sm text-blue-500 font-semibold">
                  Lihat Detail &rarr;
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
