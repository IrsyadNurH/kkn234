// app/program-kerja/page.tsx
import { PrismaClient } from '@prisma/client';

// Inisialisasi Prisma Client di luar komponen agar tidak dibuat ulang setiap render
const prisma = new PrismaClient();

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
  const daftarProgram = await getProgramKerja();

  // Tambahkan data dummy jika database kosong untuk tes
  if (daftarProgram.length === 0) {
      await prisma.programKerja.create({
          data: {
              nama: "Penyuluhan Kesehatan Lingkungan",
              deskripsi: "Memberikan edukasi kepada masyarakat tentang pentingnya menjaga kebersihan lingkungan untuk kesehatan bersama.",
              penanggungJawab: "Divisi Kesehatan"
          }
      });
      // Panggil lagi untuk refresh data
      const updatedDaftarProgram = await getProgramKerja();
      daftarProgram.push(...updatedDaftarProgram);
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Program Kerja Unggulan
      </h1>
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
    </div>
  );
}