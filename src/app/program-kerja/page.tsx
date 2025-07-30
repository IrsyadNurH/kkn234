// app/program-kerja/page.tsx
import { prisma } from '../../../lib/prisma';
import type { ProgramKerja } from '@prisma/client';

// Tambahkan baris ini untuk membuat halaman menjadi dinamis
export const dynamic = 'force-dynamic';

// Ambil data Program Kerja dari database
async function getProgramKerja() {
  const programKerja = await prisma.programKerja.findMany({
    orderBy: {
      tanggal: 'desc', // Urutkan dari yang terbaru
    },
  });
  return programKerja;
}

export default async function ProgramKerjaPage() {
  const daftarProgram: ProgramKerja[] = await getProgramKerja();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Program Kerja Unggulan
      </h1>

      {daftarProgram.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada program kerja yang ditambahkan.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {daftarProgram.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold text-blue-600 mb-2">{program.nama}</h2>
              <p className="text-gray-600 mb-4">{program.deskripsi}</p>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>PJ:</strong> {program.penanggungJawab}
                </p>
                <p>
                  <strong>Tanggal:</strong> {new Date(program.tanggal).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}