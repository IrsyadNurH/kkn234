// app/admin/page.tsx
import { prisma } from '../../../lib/prisma';
import AdminClientPage from './AdminClientPage';

// Komponen ini sekarang menjadi Server Component untuk mengambil data
export default async function AdminPage() {
  // Ambil semua konten yang akan dikelola dari database
  const [dokumentasi, artikel] = await Promise.all([
    prisma.dokumentasi.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.artikel.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  // Kirim data yang sudah diambil sebagai props ke komponen client
  return <AdminClientPage initialDokumentasi={dokumentasi} initialArtikel={artikel} />;
}