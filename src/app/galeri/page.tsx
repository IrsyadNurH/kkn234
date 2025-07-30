import { prisma } from '../../../lib/prisma';
import GalleryClientPage from './GalleryClientPage';

// Tambahkan baris ini untuk membuat halaman menjadi dinamis
export const dynamic = 'force-dynamic';

// Fungsi untuk mengambil semua data dokumentasi dari server
async function getDokumentasi() {
  return prisma.dokumentasi.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Ini adalah Server Component yang mengambil data awal
export default async function GaleriPage() {
  const allPhotos = await getDokumentasi();

  // Kirim data ke komponen client untuk ditampilkan
  return <GalleryClientPage photos={allPhotos} />;
}
