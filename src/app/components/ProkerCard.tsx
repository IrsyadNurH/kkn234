import type { ProgramKerja } from '@prisma/client'; // PERBAIKAN: Impor tipe data

// PERBAIKAN: Terapkan tipe data pada props
export default function ProkerCard({ program }: { program: ProgramKerja }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden snap-start">
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-600 truncate">{program.nama}</h3>
        <p className="text-gray-600 mt-2 h-24 overflow-hidden text-ellipsis">
          {program.deskripsi}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          <strong>PJ:</strong> {program.penanggungJawab}
        </div>
      </div>
    </div>
  );
}
