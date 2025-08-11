import {prisma} from '../../../../lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// This function helps Next.js know which pages to build statically
export async function generateStaticParams() {
    const programs = await prisma.programKerja.findMany({
        select: { id: true }
    });
    return programs.map(program => ({
        id: program.id.toString(),
    }));
}

async function getProgramKerjaDetail(id: number) {
  const program = await prisma.programKerja.findUnique({
    where: { id },
  });
  if (!program) {
    notFound();
  }
  return program;
}

// Define the correct props type for the page
interface PageProps {
    params: { id: string };
}

// Make the component async to correctly handle props
export default async function ProgramKerjaDetailPage({ params }: PageProps) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const program = await getProgramKerjaDetail(id);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {program.imageUrl && (
        <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image src={program.imageUrl} alt={program.nama} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{program.nama}</h1>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 mb-8">
        <span>
          <strong>Tanggal:</strong> {new Date(program.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span>
          <strong>PJ:</strong> {program.penanggungJawab}
        </span>
      </div>
      {/* Menggunakan 'whitespace-pre-line' untuk menjaga format paragraf dari textarea */}
      <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
        {program.deskripsi}
      </div>
    </div>
  );
}
