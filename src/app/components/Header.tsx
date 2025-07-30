// app/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          KKN 234 MANGUNARGA
        </Link>
        <nav>
          <Link href="/" className="px-4 hover:text-blue-500">Beranda</Link>
          <Link href="/program-kerja" className="px-4 hover:text-blue-500">Program Kerja</Link>
          {/* Tambahkan ini */}
          <Link href="/galeri" className="px-4 hover:text-blue-500">Galeri</Link>
        </nav>
      </div>
    </header>
  );
}