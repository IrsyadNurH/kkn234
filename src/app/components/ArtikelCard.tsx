import type { Artikel } from '@prisma/client'; // PERBAIKAN: Impor tipe data

// PERBAIKAN: Terapkan tipe data pada props
export default function ArtikelCard({ artikel }: { artikel: Artikel }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden snap-start">
      <div className="p-6">
        <h3 className="text-lg font-bold text-green-600 truncate">{artikel.judul}</h3>
        <p className="text-gray-600 mt-2 h-24 overflow-hidden text-ellipsis">
          {artikel.konten}
        </p>
        <div className="mt-4 text-sm text-gray-400">
          {new Date(artikel.tanggalTerbit).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
