// app/admin/page.tsx
import { prisma } from '../../../lib/prisma';
import AdminClientPage from './AdminClientPage';

// Tambahkan baris ini untuk membuat halaman menjadi dinamis
export const dynamic = 'force-dynamic';

// Komponen ini mengambil semua data yang dibutuhkan untuk halaman admin
export default async function AdminPage() {
  const [dokumentasi, artikel, programKerja] = await Promise.all([
    prisma.dokumentasi.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.artikel.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.programKerja.findMany({ orderBy: { tanggal: 'desc' } }),
  ]);

  // Kirim semua data sebagai props ke komponen client
  return (
    <AdminClientPage 
      initialDokumentasi={dokumentasi} 
      initialArtikel={artikel} 
      initialProgramKerja={programKerja} 
    />
  );
}
